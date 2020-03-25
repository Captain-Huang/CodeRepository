using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

public delegate void EventCallback(object args);

public class EventCenter
{
    private static EventCenter _inst;
    private Dictionary<string, EventCallback> _events = new Dictionary<string, EventCallback>();

    public static EventCenter inst
    {
        get
        {
            if (_inst == null)
                _inst = new EventCenter();

            return _inst;
        }
    }

    /// <summary>
    /// 添加事件监听
    /// </summary>
    /// <param name="type"></param>
    /// <param name="callback"></param>
    public void AddEventListener(string type, EventCallback callback)
    {
        if (_events.ContainsKey(type))
            _events[type] += callback;
        else
            _events[type] = callback;
    }

    /// <summary>
    /// 移除事件监听
    /// </summary>
    /// <param name="type"></param>
    /// <param name="callback"></param>
    public void RemoveEventListener(string type, EventCallback callback)
    {
        if (_events.ContainsKey(type))
        {
            _events[type] -= callback;
            if (_events[type] == null)
                _events.Remove(type);
        }
    }

    /// <summary>
    /// 派发事件
    /// </summary>
    /// <param name="type"></param>
    /// <param name="args"></param>
    public void DispatchEvent(string type, object args = null)
    {
        EventCallback cb;
        if (_events.TryGetValue(type, out cb))
            cb.Invoke(args);
    }
}
