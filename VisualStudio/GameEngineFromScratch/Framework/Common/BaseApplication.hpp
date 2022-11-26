#pragma once
#include "IApplication.hpp"

namespace My {
	class BaseApplication : implements IApplication {
	public:
		virtual int Initialize();
		virtual void Finalize();
		// one cycle of the main loop
		virtual void Tick() = 0;

		virtual bool IsQuit() = 0;

	protected:
		// Flag if need quit the main loop of the application
		bool m_bQuit;
	};
}