#include <Windows.h>
#include <windowsx.h>
#include <tchar.h>
#include <stdint.h>

#include <d3d11.h>
#include <d3d11_1.h>
#include <d3dcompiler.h>
#include <DirectXMath.h>
#include <DirectXPackedVector.h>
#include <DirectXColors.h>

using namespace DirectX;
using namespace DirectX::PackedVector;

const uint32_t SCREEN_WIDTH = 960;
const uint32_t SCREEN_HEIGHT = 480;

// global declarations
IDXGISwapChain* g_pSwapchain = nullptr;	// the pointer to the swap chain interface 该链封装用于呈现和显示的两个或多个缓冲区。 它们通常包含提供给显示设备的前端缓冲区和用作呈现目标的后退缓冲区。 在立即上下文呈现到后台缓冲区后，交换链通过交换两个缓冲区来呈现后台缓冲区。
ID3D11Device* g_pDev = nullptr;	// the pointer to our d3d device interface 设备用于创建资源并枚举显示适配器的功能
ID3D11DeviceContext* g_pDevcon = nullptr;	// the pointer to our d3d context interface 设备上下文包含使用设备的情况或设置。 更具体地说，设备上下文用于设置管道状态，并使用设备拥有的资源生成呈现命令

ID3D11RenderTargetView* g_pRTView = nullptr;

ID3D11InputLayout* g_pLayout = nullptr;	// the pointer to the input layout 输入布局接口包含如何将内存中布局的顶点数据馈送到图形管道的输入装配器阶段的定义。
ID3D11VertexShader* g_pVS = nullptr;	// the pointer to the vertex shader 顶点着色器接口 (控制顶点着色器阶段的顶点着色器) 管理可执行程序
ID3D11PixelShader* g_pPS = nullptr;	// the pointer to the pixel shader 像素着色器接口管理可执行程序， (控制像素着色器阶段的像素着色器) 

ID3D11Buffer* g_pVBuffer = nullptr;	// vertex buffer

// vertex buffer structure
struct VERTEX {
	XMFLOAT3 Position;
	XMFLOAT4 Color;
};

template<class T>
inline void SafeRelease(T** ppInterfaceToRelease) {
	if (*ppInterfaceToRelease != nullptr) {
		(*ppInterfaceToRelease)->Release();
		(*ppInterfaceToRelease) = nullptr;
	}
}

void CreateRenderTarget() {
	HRESULT hr;
	ID3D11Texture2D* pBackBuffer;

	// 获取指向后缓冲区
	g_pSwapchain->GetBuffer(0, __uuidof(ID3D11Texture2D), (LPVOID*)&pBackBuffer);

	// 创建呈现目标视图
	g_pDev->CreateRenderTargetView(pBackBuffer, NULL, &g_pRTView);

	pBackBuffer->Release();

	// Bind the view
	g_pDevcon->OMSetRenderTargets(1, &g_pRTView, NULL);
}

// 创建视区以定义呈现目标的各个部分将可见
void SetViewPort() {
	// 定义视区
	D3D11_VIEWPORT viewport;
	ZeroMemory(&viewport, sizeof(D3D11_VIEWPORT));

	viewport.TopLeftX = 0;
	viewport.TopLeftY = 0;
	viewport.Width = SCREEN_WIDTH;
	viewport.Height = SCREEN_HEIGHT;

	// 设置视区
	g_pDevcon->RSSetViewports(1, &viewport);
}

// this is the function that loads and prepares the shaders
void InitPipeline() {
	// load and compile the two shaders
	ID3DBlob* VS;
	ID3DBlob* PS;

	D3DReadFileToBlob(L"copy.vso", &VS);
	D3DReadFileToBlob(L"copy.pso", &PS);

	// encapsulate both shaders into shader objects
	// 从已编译的着色器创建顶点着色器对象和像素着色器对象
	g_pDev->CreateVertexShader(VS->GetBufferPointer(), VS->GetBufferSize(), NULL, &g_pVS);
	g_pDev->CreatePixelShader(PS->GetBufferPointer(), PS->GetBufferSize(), NULL, &g_pPS);

	// set the shader objects
	g_pDevcon->VSSetShader(g_pVS, 0, 0);
	g_pDevcon->PSSetShader(g_pPS, 0, 0);

	// create the input layout object
	// 输入汇编器阶段的单个元素的说明
	D3D11_INPUT_ELEMENT_DESC ied[] = {
		{"POSITION", 0, DXGI_FORMAT_R32G32B32_FLOAT, 0, 0, D3D11_INPUT_PER_VERTEX_DATA, 0},
		{"COLOR", 0, DXGI_FORMAT_R32G32B32A32_FLOAT, 0, 12, D3D11_INPUT_PER_VERTEX_DATA, 0}
	};
	// 创建输入布局对象来描述输入装配器阶段的输入缓冲区数据
	g_pDev->CreateInputLayout(ied, 2, VS->GetBufferPointer(), VS->GetBufferSize(), &g_pLayout);
	// 将输入布局对象绑定到输入装配器阶段
	g_pDevcon->IASetInputLayout(g_pLayout);

	VS->Release();
	PS->Release();
}

void InitGraphics() {
	/*
	初始化静态顶点缓冲区

	定义描述顶点的结构。 例如，如果顶点数据包含位置数据和颜色数据，则结构将有一个矢量来描述位置，另一个矢量描述颜色。
	使用 malloc 或新的) 为步骤一中定义的结构分配内存 (。 使用描述几何图形的实际顶点数据填充此缓冲区。
	通过填充 D3D11_BUFFER_DESC 结构来创建缓冲区说明。 将D3D11_BIND_VERTEX_BUFFER标志传递给 BindFlags 成员，并将结构的大小从步骤一传递到 ByteWidth 成员。
	通过填写 D3D11_SUBRESOURCE_DATA 结构来创建子资源数据说明。 D3D11_SUBRESOURCE_DATA结构的 pSysMem 成员应直接指向步骤 2 中创建的资源数据。
	调用 ID3D11Device：：CreateBuffer ，同时传递 D3D11_BUFFER_DESC 结构、 D3D11_SUBRESOURCE_DATA 结构和指向要初始化的 ID3D11Buffer 接口的指针的地址。
	*/
	{
		VERTEX OurVertices[] = {
			{XMFLOAT3(0.0f, 0.5f, 0.0f), XMFLOAT4(1.0f, 0.0f, 0.0f, 1.0f)},
			{XMFLOAT3(0.45f, -0.5f, 0.0f), XMFLOAT4(0.0f, 1.0f, 0.0f, 1.0f)},
			{XMFLOAT3(-0.45f, -0.5f, 0.0f), XMFLOAT4(0.0f, 0.0f, 1.0f, 1.0f)},
		};

		D3D11_BUFFER_DESC bd;
		ZeroMemory(&bd, sizeof(bd));

		bd.Usage = D3D11_USAGE_DYNAMIC;
		bd.ByteWidth = sizeof(VERTEX) * 3;
		bd.BindFlags = D3D11_BIND_VERTEX_BUFFER;
		bd.CPUAccessFlags = D3D11_CPU_ACCESS_WRITE;

		g_pDev->CreateBuffer(&bd, NULL, &g_pVBuffer);
	}

	// copy the vertices into the buffer
	D3D11_MAPPED_SUBRESOURCE ms;
	g_pDevcon->Map(g_pVBuffer, NULL, D3D11_MAP_WRITE_DISCARD, NULL, &ms);	// map the buffer
	memcpy(ms.pData, OurVertices, sizeof(VERTEX) * 3);	// copy the data
	g_pDevcon->Unmap(g_pVBuffer, NULL);	// unmap the buffer
}

HRESULT CreateGraphicsResources(HWND hWnd) {
	HRESULT hr = S_OK;
	if (g_pSwapchain == nullptr) {
		DXGI_SWAP_CHAIN_DESC scd;

		ZeroMemory(&scd, sizeof(DXGI_SWAP_CHAIN_DESC));

		// 创建引用设备

		// 1. 定义交换链的初始参数
		scd.BufferCount = 1;
		scd.BufferDesc.Width = SCREEN_WIDTH;
		scd.BufferDesc.Height = SCREEN_HEIGHT;
		scd.BufferDesc.Format = DXGI_FORMAT_R8G8B8A8_UNORM;
		scd.BufferDesc.RefreshRate.Numerator = 60;
		scd.BufferDesc.RefreshRate.Denominator = 1;
		scd.BufferUsage = DXGI_USAGE_RENDER_TARGET_OUTPUT;
		scd.OutputWindow = hWnd;
		scd.SampleDesc.Count = 4;
		scd.Windowed = TRUE;
		scd.Flags = DXGI_SWAP_CHAIN_FLAG_ALLOW_MODE_SWITCH;

		// 2. 请求实现应用程序所需的功能的功能级别
		const D3D_FEATURE_LEVEL FeatureLevels[] = { 
			D3D_FEATURE_LEVEL_11_1,
			D3D_FEATURE_LEVEL_11_0,
			D3D_FEATURE_LEVEL_10_1,
			D3D_FEATURE_LEVEL_10_0,
			D3D_FEATURE_LEVEL_9_3,
			D3D_FEATURE_LEVEL_9_2,
			D3D_FEATURE_LEVEL_9_1 
		};

		D3D_FEATURE_LEVEL FeatureLevelSupported;

		// 3. 通过调用 D3D11CreateDeviceAndSwapChain 创建设备
		hr = D3D11CreateDeviceAndSwapChain(NULL,
			D3D_DRIVER_TYPE_HARDWARE,
			NULL,
			0,
			FeatureLevels,
			_countof(FeatureLevels),
			D3D11_SDK_VERSION,
			&scd,
			&g_pSwapchain,
			&g_pDev,
			&FeatureLevelSupported,
			&g_pDevcon);

		if (hr == E_INVALIDARG) {
			hr = D3D11CreateDeviceAndSwapChain(NULL,
				D3D_DRIVER_TYPE_HARDWARE,
				NULL,
				0,
				&FeatureLevelSupported,
				1,
				D3D11_SDK_VERSION,
				&scd,
				&g_pSwapchain,
				&g_pDev,
				NULL,
				&g_pDevcon);
		}

		if (hr == S_OK) {
			CreateRenderTarget();
			SetViewPort();
			InitPipeline();
			InitGraphics();
		}
	}
	return hr;
}

void DiscardGraphicsResources() {
	SafeRelease(&g_pLayout);
	SafeRelease(&g_pVS);
	SafeRelease(&g_pPS);
	SafeRelease(&g_pVBuffer);
	SafeRelease(&g_pSwapchain);
	SafeRelease(&g_pRTView);
	SafeRelease(&g_pDev);
	SafeRelease(&g_pDevcon);
}

void RenderFrame() {
	const FLOAT clearColor[] = { 0.0f, 0.2f, 0.4f, 1.0f };
	g_pDevcon->ClearRenderTargetView(g_pRTView, clearColor);

	{
		UINT stride = sizeof(VERTEX);
		UINT offset = 0;
		g_pDevcon->IASetVertexBuffers(0, 1, &g_pVBuffer, &stride, &offset);

		g_pDevcon->IASetPrimitiveTopology(D3D10_PRIMITIVE_TOPOLOGY_TRIANGLELIST);

		g_pDevcon->Draw(3, 0);
	}

	g_pSwapchain->Present(0, 0);
}

// the WindowProc function prototype
LRESULT CALLBACK WindowProc(HWND hWnd, UINT message, WPARAM wParam, LPARAM lParam);

// the entry point for any Windows program
int WINAPI WinMain(HINSTANCE hInstance, HINSTANCE hPrevInstance, LPTSTR lpCmdLine, int nCmdShow) {
	// the handle for the window, filled by a function
	HWND hWnd;
	// this struct holds information for the window class
	WNDCLASSEX wc;

	// clear out the window class for use
	ZeroMemory(&wc, sizeof(WNDCLASSEX));

	// fill in the struct with the needed information
	wc.cbSize = sizeof(WNDCLASSEX);
	wc.style = CS_HREDRAW | CS_VREDRAW;
	wc.lpfnWndProc = WindowProc;
	wc.hInstance = hInstance;
	wc.hCursor = LoadCursor(NULL, IDC_ARROW);
	wc.hbrBackground = (HBRUSH)COLOR_WINDOW;
	wc.lpszClassName = _T("WindowClass1");

	// register the window class
	RegisterClassEx(&wc);

	// create the window and use the result as the handle
	hWnd = CreateWindowEx(0,
		_T("WindowClass1"),	// name of the window class
		_T("Hello, Engine![Direct 3D]"),	// title of the window
		WS_OVERLAPPEDWINDOW,	// window style
		100,	// x-position of the window
		100,	// y-position of the window
		SCREEN_WIDTH,	// width of the window
		SCREEN_HEIGHT,	// height of the window
		NULL,	// we have no parent window, null
		NULL,	// we aren't using menus, null
		hInstance,	// application handle
		NULL);	// used with multiple windows, null

	// display the window on the screen
	ShowWindow(hWnd, nCmdShow);

	// enter the main loop

	// this struct holds windows event message
	MSG msg;

	// wait for the next message in the quene, store the result in 'msg'
	while (GetMessage(&msg, NULL, 0, 0))
	{
		// translate keystroke messages into the right format
		TranslateMessage(&msg);

		// send the message to the WindowProc function
		DispatchMessage(&msg);
	}

	// return this part of the WM_QUIT message to Windows
	return msg.wParam;
}

// this is the main message handler for the program
LRESULT CALLBACK WindowProc(HWND hWnd, UINT message, WPARAM wParam, LPARAM lParam) {
	LRESULT result = 0;
	bool wasHandled = false;

	// sort through and find what code to run for the message given
	switch (message)
	{
	case WM_CREATE:
		wasHandled = true;
		break;

	case WM_PAINT: 
		result = CreateGraphicsResources(hWnd);
		RenderFrame();
		wasHandled = true;
		break;
	case WM_SIZE:
		if (g_pSwapchain != nullptr) {
			DiscardGraphicsResources();
			g_pSwapchain->ResizeBuffers(0, 0, 0, DXGI_FORMAT_UNKNOWN, DXGI_SWAP_CHAIN_FLAG_ALLOW_MODE_SWITCH);
		}
		wasHandled = true;
		break;
	// this message is read when the window is closed
	case WM_DESTROY: 
		DiscardGraphicsResources();
		// close the application entirely
		PostQuitMessage(0);
		wasHandled = true;
		break;
	case WM_DISPLAYCHANGE:
		InvalidateRect(hWnd, nullptr, false);
		wasHandled = true;
		break;
	}

	// Handle any message the switch statement didn't
	if (!wasHandled) { result = DefWindowProc(hWnd, message, wParam, lParam); }
	return result;
}