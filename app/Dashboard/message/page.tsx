'use client';

import { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';

const sidebarSections = [
  { key: 'dashboard', label: 'Dashboard', path: '/Dashboard', icon: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    </svg>
  ) },
  { key: 'sales', label: 'Sales', path: '/Dashboard/sales', icon: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ) },
  { key: 'employees', label: 'Employees', path: '/Dashboard/employees', icon: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
  ) },
  { key: 'projects', label: 'Projects', path: '/Dashboard/projects', icon: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
    </svg>
  ) },
  { key: 'tasks', label: 'Tasks', path: '/Dashboard/tasks', icon: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
    </svg>
  ) },
  { key: 'meet', label: 'Meet', path: '/Dashboard/meet', icon: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
    </svg>
  ) },
  { key: 'message', label: 'Message', path: '/Dashboard/message', icon: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
    </svg>
  ) },
  { key: 'profile', label: 'Profile', path: '/Dashboard/profile', icon: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
  ) },
];

const conversations = [
  {
    id: 1,
    name: 'Alice Smith',
    avatar: 'AS',
    lastMessage: 'Can we schedule a meeting tomorrow?',
    time: '10:30 AM',
    unread: 2,
    isOnline: true
  },
  {
    id: 2,
    name: 'Robert Johnson',
    avatar: 'RJ',
    lastMessage: 'The project timeline looks good',
    time: 'Yesterday',
    unread: 0,
    isOnline: false
  },
  {
    id: 3,
    name: 'Sarah Williams',
    avatar: 'SW',
    lastMessage: "'I' ve sent the updated files",
    time: 'Yesterday',
    unread: 1,
    isOnline: true
  },
  {
    id: 4,
    name: 'Team Chat',
    avatar: 'TC',
    lastMessage: 'Meeting at 2 PM today',
    time: '2 days ago',
    unread: 0,
    isOnline: true
  }
];

interface Message {
  id: number;
  text: string;
  senderId: number;
  timestamp: Date;
  status: 'sent' | 'delivered' | 'read';
  reactions: { [key: string]: number };
  isEdited?: boolean;
  attachments?: { type: 'image' | 'file'; url: string; name: string }[];
  isPinned?: boolean;
  replyTo?: number;
  isThread?: boolean;
}

interface UserProfile {
  id: number;
  name: string;
  avatar: string;
  role: string;
  department: string;
  email: string;
  isOnline: boolean;
}

const userProfiles: UserProfile[] = [
  {
    id: 1,
    name: 'Alice Smith',
    avatar: 'AS',
    role: 'Project Manager',
    department: 'Engineering',
    email: 'alice.smith@company.com',
    isOnline: true
  },
  {
    id: 2,
    name: 'Robert Johnson',
    avatar: 'RJ',
    role: 'Senior Developer',
    department: 'Engineering',
    email: 'robert.johnson@company.com',
    isOnline: false
  },
  {
    id: 3,
    name: 'Sarah Williams',
    avatar: 'SW',
    role: 'UI/UX Designer',
    department: 'Design',
    email: 'sarah.williams@company.com',
    isOnline: true
  },
  {
    id: 4,
    name: 'Michael Brown',
    avatar: 'MB',
    role: 'Product Manager',
    department: 'Product',
    email: 'michael.brown@company.com',
    isOnline: true
  }
];

export default function MessagePage() {
  const router = useRouter();
  const pathname = usePathname();
  const [selectedChat, setSelectedChat] = useState(1);
  const [message, setMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [editingMessageId, setEditingMessageId] = useState<number | null>(null);
  const [isTyping, setIsTyping] = useState(false);
  const [forwardingMessage, setForwardingMessage] = useState<Message | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [replyTo, setReplyTo] = useState<number | null>(null);
  const [showProfileSearch, setShowProfileSearch] = useState(false);
  const [profileSearchQuery, setProfileSearchQuery] = useState('');
  const [selectedProfile, setSelectedProfile] = useState<UserProfile | null>(null);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: 'Hi there! How can I help you today?',
      senderId: 1,
      timestamp: new Date(Date.now() - 3600000),
      status: 'read',
      reactions: {},
      isPinned: true
    },
    {
      id: 2,
      text: 'I need help with the project timeline',
      senderId: 0,
      timestamp: new Date(Date.now() - 3540000),
      status: 'read',
      reactions: {},
      replyTo: 1
    }
  ]);

  const filteredProfiles = userProfiles.filter(profile =>
    profile.name.toLowerCase().includes(profileSearchQuery.toLowerCase()) ||
    profile.role.toLowerCase().includes(profileSearchQuery.toLowerCase()) ||
    profile.department.toLowerCase().includes(profileSearchQuery.toLowerCase())
  );

  const handleStartChat = (profile: UserProfile) => {
    // Add the user to conversations if not already present
    if (!conversations.find(c => c.id === profile.id)) {
      const newConversation = {
        id: profile.id,
        name: profile.name,
        avatar: profile.avatar,
        lastMessage: '',
        time: 'Just now',
        unread: 0,
        isOnline: profile.isOnline
      };
      // This is a simulation. In a real app, you would add to a global state or fetch from backend
      conversations.push(newConversation as any); // Temporarily cast to any for quick demo
    }
    setSelectedChat(profile.id);
    setShowProfileSearch(false);
    setProfileSearchQuery('');
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() || selectedFile) {
      const newMessage: Message = {
        id: messages.length + 1,
        text: message.trim(),
        senderId: 0,
        timestamp: new Date(),
        status: 'sent',
        reactions: {},
        replyTo: replyTo,
        attachments: selectedFile ? [{
          type: selectedFile.type.startsWith('image/') ? 'image' : 'file',
          url: URL.createObjectURL(selectedFile),
          name: selectedFile.name
        }] : undefined
      };
      
      setMessages(prev => [...prev, newMessage]);
      setMessage('');
      setSelectedFile(null);
      setReplyTo(null);
      
      // Simulate typing indicator
      setIsTyping(true);
      setTimeout(() => setIsTyping(false), 2000);

      // Simulate message delivery and read status
      setTimeout(() => {
        setMessages(prev => prev.map(msg => 
          msg.id === newMessage.id ? { ...msg, status: 'delivered' } : msg
        ));
      }, 1000);

      setTimeout(() => {
        setMessages(prev => prev.map(msg => 
          msg.id === newMessage.id ? { ...msg, status: 'read' } : msg
        ));
      }, 2000);
      
      // Simulate receiving a response after 3 seconds
      setTimeout(() => {
        const response: Message = {
          id: messages.length + 2,
          text: 'I\'ll help you with that right away!',
          senderId: selectedChat,
          timestamp: new Date(),
          status: 'sent',
          reactions: {}
        };
        setMessages(prev => [...prev, response]);
      }, 3000);
    }
  };

  const handleEditMessage = (messageId: number, newText: string) => {
    setMessages(prev => prev.map(msg => 
      msg.id === messageId ? { ...msg, text: newText, isEdited: true } : msg
    ));
    setEditingMessageId(null);
  };

  const handleDeleteMessage = (messageId: number) => {
    setMessages(prev => prev.filter(msg => msg.id !== messageId));
  };

  const handleAddReaction = (messageId: number, reaction: string) => {
    setMessages(prev => prev.map(msg => {
      if (msg.id === messageId) {
        const reactions = { ...msg.reactions };
        reactions[reaction] = (reactions[reaction] || 0) + 1;
        return { ...msg, reactions };
      }
      return msg;
    }));
  };

  const handlePinMessage = (messageId: number) => {
    setMessages(prev => prev.map(msg => 
      msg.id === messageId ? { ...msg, isPinned: !msg.isPinned } : msg
    ));
  };

  const handleForwardMessage = (message: Message) => {
    setForwardingMessage(message);
  };

  const handleForward = (targetChatId: number) => {
    if (forwardingMessage) {
      const newMessage: Message = {
        ...forwardingMessage,
        id: messages.length + 1,
        timestamp: new Date(),
        status: 'sent',
        reactions: {},
        isPinned: false, // Forwarded messages are not pinned by default
        replyTo: undefined // Forwarded messages do not carry reply context
      };
      setMessages(prev => [...prev, newMessage]);
      setForwardingMessage(null);
    }
  };

  const getReplyMessage = (messageId: number) => {
    return messages.find(msg => msg.id === messageId);
  };

  const getStatusIcon = (status: Message['status']) => {
    switch (status) {
      case 'sent':
        return '✓';
      case 'delivered':
        return '✓✓';
      case 'read':
        return '✓✓';
      default:
        return '';
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Left Sidebar Navigation */}
      <aside className="w-64 bg-white shadow-sm h-screen fixed left-0 top-0">
        <div className="p-4">
          <h2 className="text-xl font-bold text-blue-600 mb-8">LakshyaX</h2>
          <nav className="space-y-2">
            {sidebarSections.map(section => (
              <button
                key={section.key}
                onClick={() => router.push(section.path)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                  pathname === section.path 
                    ? 'bg-blue-50 text-blue-600' 
                    : 'text-gray-600 hover:bg-blue-50 hover:text-blue-600'
                }`}
              >
                {section.icon}
                <span>{section.label}</span>
                {pathname === section.path && (
                  <svg className="w-5 h-5 ml-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </button>
            ))}
          </nav>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 ml-64">
        <div className="flex h-screen">
          {/* Conversations Sidebar */}
          <div className="w-80 bg-white border-r border-gray-200">
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900">Messages</h2>
                <button
                  onClick={() => setShowProfileSearch(true)}
                  className="p-2 text-gray-500 hover:text-blue-600 rounded-full hover:bg-gray-100"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                  </svg>
                </button>
              </div>
            </div>
            <div className="overflow-y-auto h-[calc(100vh-4rem)]">
              {conversations.map(chat => (
                <button
                  key={chat.id}
                  onClick={() => setSelectedChat(chat.id)}
                  className={`w-full p-4 flex items-center space-x-3 hover:bg-gray-50 transition-colors ${
                    selectedChat === chat.id ? 'bg-blue-50' : ''
                  }`}
                >
                  <div className="h-10 w-10 rounded-full bg-blue-600 text-white flex items-center justify-center">
                    {chat.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center">
                      <h3 className="text-sm font-medium text-gray-900 truncate">{chat.name}</h3>
                      <span className="text-xs text-gray-500">{chat.time}</span>
                    </div>
                    <p className="text-sm text-gray-500 truncate">{chat.lastMessage}</p>
                  </div>
                  {chat.unread > 0 && (
                    <div className="h-5 w-5 rounded-full bg-blue-600 text-white text-xs flex items-center justify-center">
                      {chat.unread}
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Chat Area */}
          <div className="flex-1 flex flex-col">
            {/* Chat Header */}
            <div className="p-4 border-b border-gray-200 bg-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <div className="h-10 w-10 rounded-full bg-blue-600 text-white flex items-center justify-center">
                      {conversations.find(c => c.id === selectedChat)?.avatar}
                    </div>
                    <div className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white ${
                      conversations.find(c => c.id === selectedChat)?.isOnline ? 'bg-green-500' : 'bg-gray-400'
                    }`} />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">
                      {conversations.find(c => c.id === selectedChat)?.name}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {conversations.find(c => c.id === selectedChat)?.isOnline ? 'Online' : 'Offline'}
                    </p>
                  </div>
                </div>
                {isTyping && (
                  <span className="text-sm text-gray-500">
                    {conversations.find(c => c.id === selectedChat)?.name} is typing...
                  </span>
                )}
              </div>
            </div>

            {/* Pinned Messages */}
            {messages.filter(msg => msg.isPinned).length > 0 && (
              <div className="p-2 bg-yellow-50 border-b border-yellow-100">
                <div className="flex items-center space-x-2 text-sm text-yellow-800">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                  </svg>
                  <span>Pinned Messages</span>
                </div>
                <div className="mt-2 space-y-2">
                  {messages.filter(msg => msg.isPinned).map(msg => (
                    <div key={msg.id} className="flex items-start space-x-2 text-sm">
                      <div className="flex-1 bg-white rounded p-2 shadow-sm">
                        <div className="font-medium">{conversations.find(c => c.id === msg.senderId)?.name}</div>
                        <div className="text-gray-600">{msg.text}</div>
                      </div>
                      <button
                        onClick={() => handlePinMessage(msg.id)}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
              {messages.map(msg => (
                <div key={msg.id} className={`flex ${msg.senderId === 0 ? 'justify-end' : 'justify-start'}`}>
                  <div className="group relative">
                    <div className={`rounded-lg px-4 py-2 max-w-[70%] shadow-sm ${
                      msg.senderId === 0 ? 'bg-blue-600' : 'bg-white'
                    }`}>
                      {msg.replyTo && (
                        <div className="mb-2 p-2 bg-gray-100 rounded text-sm">
                          <div className="font-medium">
                            {conversations.find(c => c.id === getReplyMessage(msg.replyTo!)?.senderId)?.name}
                          </div>
                          <div className="text-gray-600">{getReplyMessage(msg.replyTo!)?.text}</div>
                        </div>
                      )}
                      {editingMessageId === msg.id ? (
                        <form onSubmit={(e) => {
                          e.preventDefault();
                          const form = e.target as HTMLFormElement;
                          const input = form.querySelector('input') as HTMLInputElement;
                          handleEditMessage(msg.id, input.value);
                        }}>
                          <input
                            type="text"
                            defaultValue={msg.text}
                            className="w-full px-2 py-1 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            autoFocus
                          />
                        </form>
                      ) : (
                        <>
                          <p className={msg.senderId === 0 ? 'text-white' : 'text-gray-900'}>
                            {msg.text}
                            {msg.isEdited && (
                              <span className="text-xs ml-2 opacity-75">(edited)</span>
                            )}
                          </p>
                          {msg.attachments?.map((attachment, index) => (
                            <div key={index} className="mt-2">
                              {attachment.type === 'image' ? (
                                <img
                                  src={attachment.url}
                                  alt={attachment.name}
                                  className="max-w-full rounded-lg"
                                />
                              ) : (
                                <a
                                  href={attachment.url}
                                  download={attachment.name}
                                  className="flex items-center space-x-2 text-blue-500 hover:text-blue-600"
                                >
                                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                                  </svg>
                                  <span>{attachment.name}</span>
                                </a>
                              )}
                            </div>
                          ))}
                          <div className="flex items-center justify-between mt-1">
                            <span className={`text-xs ${msg.senderId === 0 ? 'text-blue-100' : 'text-gray-500'}`}>
                              {formatTime(msg.timestamp)}
                            </span>
                            {msg.senderId === 0 && (
                              <span className="text-xs text-blue-100 ml-2">
                                {getStatusIcon(msg.status)}
                              </span>
                            )}
                          </div>
                          {Object.entries(msg.reactions).length > 0 && (
                            <div className="flex gap-1 mt-1">
                              {Object.entries(msg.reactions).map(([reaction, count]) => (
                                <span key={reaction} className="text-xs bg-gray-100 rounded-full px-2 py-0.5">
                                  {reaction} {count}
                                </span>
                              ))}
                            </div>
                          )}
                        </>
                      )}
                    </div>
                    {msg.senderId === 0 && (
                      <div className="absolute right-0 top-0 hidden group-hover:flex gap-1">
                        <button
                          onClick={() => setEditingMessageId(msg.id)}
                          className="p-1 text-gray-500 hover:text-gray-700"
                        >
                          ✏️
                        </button>
                        <button
                          onClick={() => handleDeleteMessage(msg.id)}
                          className="p-1 text-gray-500 hover:text-red-500"
                        >
                          🗑️
                        </button>
                        <button
                          onClick={() => handlePinMessage(msg.id)}
                          className="p-1 text-gray-500 hover:text-yellow-500"
                        >
                          📌
                        </button>
                        <button
                          onClick={() => handleForwardMessage(msg)}
                          className="p-1 text-gray-500 hover:text-blue-500"
                        >
                          ↗️
                        </button>
                      </div>
                    )}
                    <div className="absolute bottom-0 right-0 hidden group-hover:flex gap-1">
                      <button
                        onClick={() => setReplyTo(msg.id)}
                        className="p-1 text-gray-500 hover:text-blue-500"
                      >
                        ↩️
                      </button>
                      <button
                        onClick={() => handleAddReaction(msg.id, '👍')}
                        className="p-1 text-gray-500 hover:text-blue-500"
                      >
                        👍
                      </button>
                      <button
                        onClick={() => handleAddReaction(msg.id, '❤️')}
                        className="p-1 text-gray-500 hover:text-red-500"
                      >
                        ❤️
                      </button>
                      <button
                        onClick={() => handleAddReaction(msg.id, '😂')}
                        className="p-1 text-gray-500 hover:text-yellow-500"
                      >
                        😂
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Message Input */}
            <form onSubmit={handleSendMessage} className="p-4 bg-white border-t border-gray-200">
              {replyTo && (
                <div className="mb-2 p-2 bg-gray-100 rounded flex justify-between items-center">
                  <div className="text-sm">
                    <div className="font-medium">Replying to {conversations.find(c => c.id === getReplyMessage(replyTo)?.senderId)?.name}</div>
                    <div className="text-gray-600">{getReplyMessage(replyTo)?.text}</div>
                  </div>
                  <button
                    onClick={() => setReplyTo(null)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              )}
              <div className="flex space-x-4">
                <div className="flex-1 flex items-center space-x-2">
                  <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type your message..."
                    className="flex-1 rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <label className="cursor-pointer">
                    <input
                      type="file"
                      onChange={handleFileSelect}
                      className="hidden"
                    />
                    <svg className="w-6 h-6 text-gray-500 hover:text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                    </svg>
                  </label>
                </div>
                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Send
                </button>
              </div>
              {selectedFile && (
                <div className="mt-2 flex items-center space-x-2 text-sm text-gray-600">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                  </svg>
                  <span>{selectedFile.name}</span>
                  <button
                    onClick={() => setSelectedFile(null)}
                    className="text-red-500 hover:text-red-600"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>

      {/* Forward Message Modal */}
      {forwardingMessage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96">
            <h3 className="text-lg font-medium mb-4">Forward Message</h3>
            <div className="mb-4">
              <p className="text-sm text-gray-600">Select a chat to forward to:</p>
            </div>
            <div className="space-y-2">
              {conversations.map(chat => (
                <button
                  key={chat.id}
                  onClick={() => handleForward(chat.id)}
                  className="w-full p-2 text-left hover:bg-gray-100 rounded"
                >
                  {chat.name}
                </button>
              ))}
            </div>
            <button
              onClick={() => setForwardingMessage(null)}
              className="mt-4 w-full px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Profile Search Modal */}
      {showProfileSearch && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-[600px] max-h-[80vh] overflow-hidden flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-medium">Search Profiles</h3>
              <button
                onClick={() => {
                  setShowProfileSearch(false);
                  setProfileSearchQuery('');
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="relative mb-4">
              <input
                type="text"
                value={profileSearchQuery}
                onChange={(e) => setProfileSearchQuery(e.target.value)}
                placeholder="Search by name, role, or department..."
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <svg className="w-5 h-5 absolute right-3 top-2.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>

            <div className="overflow-y-auto flex-1">
              <div className="grid grid-cols-1 gap-4">
                {filteredProfiles.map(profile => (
                  <div
                    key={profile.id}
                    className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleStartChat(profile)}
                  >
                    <div className="relative">
                      <div className="h-12 w-12 rounded-full bg-blue-600 text-white flex items-center justify-center text-lg font-medium">
                        {profile.avatar}
                      </div>
                      <div className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white ${
                        profile.isOnline ? 'bg-green-500' : 'bg-gray-400'
                      }`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h4 className="text-lg font-medium text-gray-900">{profile.name}</h4>
                        <span className="text-sm text-gray-500">{profile.isOnline ? 'Online' : 'Offline'}</span>
                      </div>
                      <p className="text-sm text-gray-600">{profile.role}</p>
                      <p className="text-sm text-gray-500">{profile.department}</p>
                      <p className="text-sm text-gray-500 truncate">{profile.email}</p>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleStartChat(profile);
                      }}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Message
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 