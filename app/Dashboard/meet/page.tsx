'use client';

import React from 'react';
import { useState, useEffect, useRef, useCallback } from 'react';
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

interface Meeting {
  id: string;
  title: string;
  time: string;
  date: string;
  attendees: string[];
  status: 'upcoming' | 'ongoing' | 'ended';
  duration: string;
  type: MeetingTypeKey;
}

type MeetingTypeKey = 'team' | 'project' | 'client' | 'oneOnOne';

interface MeetingType {
  color: string;
  icon: string;
  label: string;
}

interface Message {
  id: string;
  sender: string;
  content: string;
  timestamp: Date;
}

interface Participant {
  id: string;
  name: string;
  avatar: string;
  isMuted: boolean;
  isVideoOn: boolean;
  isSpeaking: boolean;
  role: 'host' | 'participant';
}

interface MeetingControl {
  icon: (isActive: boolean) => React.ReactElement;
  label: string;
  action: (state: boolean, setState: (value: boolean) => void) => void;
}

const meetingTypes: Record<MeetingTypeKey, MeetingType> = {
  team: { color: 'blue', icon: '👥', label: 'Team Meeting' },
  project: { color: 'purple', icon: '📊', label: 'Project Review' },
  client: { color: 'green', icon: '🤝', label: 'Client Meeting' },
  oneOnOne: { color: 'orange', icon: '👤', label: 'One-on-One' }
};

const meetingControls: MeetingControl[] = [
  { 
    icon: (isActive: boolean) => (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
          d={isActive ? "M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" 
          : "M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"} />
      </svg>
    ),
    label: 'Mute',
    action: (state: boolean, setState: (value: boolean) => void) => setState(!state)
  },
  {
    icon: (isActive: boolean) => (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
          d={isActive ? "M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
          : "M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"} />
      </svg>
    ),
    label: 'Video',
    action: (state: boolean, setState: (value: boolean) => void) => setState(!state)
  },
  {
    icon: (isActive: boolean) => (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
          d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    label: 'Share Screen',
    action: (state: boolean, setState: (value: boolean) => void) => setState(!state)
  },
  {
    icon: (isActive: boolean) => (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
          d={isActive ? "M21 12a9 9 0 11-18 0 9 9 0 0118 0z M9 10a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z"
          : "M21 12a9 9 0 11-18 0 9 9 0 0118 0z M9 10a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z"} />
      </svg>
    ),
    label: 'Record',
    action: (state: boolean, setState: (value: boolean) => void) => setState(!state)
  }
];

const initialUpcomingMeetings: Meeting[] = [
  { 
    id: '1', 
    title: 'Team Standup', 
    time: '10:00 AM', 
    date: '2024-06-10', 
    attendees: ['Alice', 'Bob', 'Sarah'],
    status: 'upcoming',
    duration: '30 min',
    type: 'team'
  },
  { 
    id: '2', 
    title: 'Project Review', 
    time: '2:00 PM', 
    date: '2024-06-11', 
    attendees: ['John', 'Alice', 'Bob'],
    status: 'upcoming',
    duration: '1 hour',
    type: 'project'
  },
  { 
    id: '3', 
    title: 'Client Meeting', 
    time: '11:00 AM', 
    date: '2024-06-12', 
    attendees: ['Sarah', 'John'],
    status: 'upcoming',
    duration: '45 min',
    type: 'client'
  },
];

export default function MeetPage() {
  const router = useRouter();
  const pathname = usePathname();
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past'>('upcoming');
  const [meetingTime, setMeetingTime] = useState(0);
  const [showParticipants, setShowParticipants] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [showCreateMeeting, setShowCreateMeeting] = useState(false);
  const [showEndCallConfirmation, setShowEndCallConfirmation] = useState(false);
  const [isCallEnded, setIsCallEnded] = useState(false);
  const [newMeetingTitle, setNewMeetingTitle] = useState('');
  const [newMeetingDate, setNewMeetingDate] = useState('');
  const [newMeetingTime, setNewMeetingTime] = useState('');
  const [newMeetingType, setNewMeetingType] = useState<MeetingTypeKey>('team');
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [upcomingMeetings, setUpcomingMeetings] = useState<Meeting[]>(initialUpcomingMeetings);
  const [participants, setParticipants] = useState<Participant[]>([
    { id: '1', name: 'You', avatar: 'Y', isMuted: false, isVideoOn: true, isSpeaking: false, role: 'host' },
    { id: '2', name: 'Alice', avatar: 'A', isMuted: true, isVideoOn: true, isSpeaking: true, role: 'participant' },
    { id: '3', name: 'Bob', avatar: 'B', isMuted: false, isVideoOn: false, isSpeaking: false, role: 'participant' },
    { id: '4', name: 'Sarah', avatar: 'S', isMuted: true, isVideoOn: true, isSpeaking: false, role: 'participant' },
  ]);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setMeetingTime(prev => prev + 1);
    }, 1000);
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const formatTime = useCallback((seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }, []);

  const handleCreateMeeting = useCallback(() => {
    if (!newMeetingTitle || !newMeetingDate || !newMeetingTime) {
      alert('Please fill in all required fields');
      return;
    }

    const newMeeting: Meeting = {
      id: Date.now().toString(),
      title: newMeetingTitle,
      time: newMeetingTime,
      date: newMeetingDate,
      attendees: ['You'],
      status: 'upcoming',
      duration: '30 min',
      type: newMeetingType
    };

    setUpcomingMeetings(prev => [newMeeting, ...prev]);
    setShowCreateMeeting(false);
    setNewMeetingTitle('');
    setNewMeetingDate('');
    setNewMeetingTime('');
    setNewMeetingType('team');
  }, [newMeetingTitle, newMeetingDate, newMeetingTime, newMeetingType]);

  const handleSendMessage = useCallback(() => {
    if (!newMessage.trim()) return;

    const message: Message = {
      id: Date.now().toString(),
      sender: 'You',
      content: newMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, message]);
    setNewMessage('');
  }, [newMessage]);

  const handleKeyPress = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  }, [handleSendMessage]);

  const handleEndCall = useCallback(() => {
    if (isRecording) {
      setIsRecording(false);
    }

    if (isScreenSharing) {
      setIsScreenSharing(false);
    }

    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    setIsMuted(false);
    setIsVideoOn(true);
    setIsCallEnded(true);

    const endedMeeting: Meeting = {
      id: Date.now().toString(),
      title: 'Ended Meeting',
      time: new Date().toLocaleTimeString(),
      date: new Date().toLocaleDateString(),
      attendees: participants.map(p => p.name),
      status: 'ended',
      duration: formatTime(meetingTime),
      type: 'team'
    };

    console.log('Meeting ended:', endedMeeting);
    setShowEndCallConfirmation(false);

    setTimeout(() => {
      router.push('/Dashboard');
    }, 2000);
  }, [isRecording, isScreenSharing, participants, meetingTime, formatTime, router]);

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
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Meet</h1>
            <button 
              onClick={() => setShowCreateMeeting(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
              </svg>
              <span>New Meeting</span>
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Video Call Interface */}
            <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-6">
              {isCallEnded ? (
                <div className="flex flex-col items-center justify-center h-64">
                  <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
                    <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Call Ended</h3>
                  <p className="text-gray-600">Redirecting to dashboard...</p>
                </div>
              ) : (
                <>
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold">Video Call</h2>
                    <div className="flex space-x-2">
                      <button className="px-3 py-1 text-sm bg-green-100 text-green-700 rounded-full flex items-center">
                        <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
                        Live
                      </button>
                      <button className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-full">
                        {formatTime(meetingTime)}
                      </button>
                    </div>
                  </div>
                  
                  {/* Video Grid */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    {participants.map((participant) => (
                      <div key={participant.id} className="aspect-w-16 aspect-h-9 bg-gray-100 rounded-lg overflow-hidden relative group">
                        <div className="absolute bottom-2 left-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-sm">
                          {participant.name}
                          {participant.isMuted && (
                            <span className="ml-2">🔇</span>
                          )}
                          {!participant.isVideoOn && (
                            <span className="ml-2">📷</span>
                          )}
                        </div>
                        {participant.isSpeaking && (
                          <div className="absolute inset-0 border-2 border-blue-500 rounded-lg animate-pulse"></div>
                        )}
                        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button className="p-1 bg-black bg-opacity-50 text-white rounded-full">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Meeting Controls */}
                  <div className="flex justify-center space-x-4">
                    {meetingControls.map((control, index) => {
                      const isActive = index === 0 ? isMuted : 
                                    index === 1 ? isVideoOn :
                                    index === 2 ? isScreenSharing :
                                    isRecording;
                      return (
                        <button
                          key={index}
                          onClick={() => control.action(isActive, 
                            index === 0 ? setIsMuted :
                            index === 1 ? setIsVideoOn :
                            index === 2 ? setIsScreenSharing :
                            setIsRecording
                          )}
                          className={`p-3 rounded-full transition-colors ${
                            isActive 
                              ? 'bg-gray-200 text-gray-700' 
                              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                          }`}
                          title={control.label}
                        >
                          {control.icon(isActive)}
                        </button>
                      );
                    })}
                    <button 
                      onClick={() => setShowEndCallConfirmation(true)}
                      className="p-3 rounded-full bg-red-600 text-white hover:bg-red-700 transition-colors"
                    >
                      End Call
                    </button>
                  </div>

                  {/* Additional Controls */}
                  <div className="flex justify-center mt-4 space-x-4">
                    <button 
                      onClick={() => setShowParticipants(!showParticipants)}
                      className={`px-4 py-2 rounded-lg flex items-center space-x-2 ${
                        showParticipants ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      <span>Participants ({participants.length})</span>
                    </button>
                    <button 
                      onClick={() => setShowChat(!showChat)}
                      className={`px-4 py-2 rounded-lg flex items-center space-x-2 ${
                        showChat ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                      </svg>
                      <span>Chat</span>
                    </button>
                  </div>

                  {/* Chat Panel */}
                  {showChat && (
                    <div className="mt-4 border rounded-lg p-4">
                      <div className="h-64 overflow-y-auto mb-4">
                        {messages.map(message => (
                          <div key={message.id} className="mb-4">
                            <div className="flex items-start">
                              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-medium">
                                {message.sender[0]}
                              </div>
                              <div className="ml-3">
                                <div className="flex items-center">
                                  <span className="font-medium">{message.sender}</span>
                                  <span className="text-xs text-gray-500 ml-2">
                                    {message.timestamp.toLocaleTimeString()}
                                  </span>
                                </div>
                                <p className="text-gray-700">{message.content}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                        <div ref={chatEndRef} />
                      </div>
                      <div className="flex space-x-2">
                        <textarea
                          value={newMessage}
                          onChange={(e) => setNewMessage(e.target.value)}
                          onKeyPress={handleKeyPress}
                          placeholder="Type a message..."
                          className="flex-1 border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          rows={2}
                        />
                        <button
                          onClick={handleSendMessage}
                          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                          Send
                        </button>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>

            {/* Meetings Sidebar */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex space-x-4 mb-6">
                <button
                  onClick={() => setActiveTab('upcoming')}
                  className={`px-4 py-2 rounded-lg ${
                    activeTab === 'upcoming' ? 'bg-blue-50 text-blue-600' : 'text-gray-600'
                  }`}
                >
                  Upcoming
                </button>
                <button
                  onClick={() => setActiveTab('past')}
                  className={`px-4 py-2 rounded-lg ${
                    activeTab === 'past' ? 'bg-blue-50 text-blue-600' : 'text-gray-600'
                  }`}
                >
                  Past
                </button>
              </div>

              <div className="space-y-4">
                {upcomingMeetings.map(meeting => (
                  <div key={meeting.id} className="border border-gray-200 rounded-lg p-4 hover:border-blue-500 transition-colors">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-md font-medium text-gray-900">{meeting.title}</h3>
                      <span className={`px-2 py-1 text-xs rounded-full bg-${meetingTypes[meeting.type].color}-100 text-${meetingTypes[meeting.type].color}-700`}>
                        {meetingTypes[meeting.type].icon} {meetingTypes[meeting.type].label}
                      </span>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-gray-600 flex items-center">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {meeting.time} ({meeting.duration})
                      </p>
                      <p className="text-sm text-gray-600 flex items-center">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        {meeting.date}
                      </p>
                      <div className="flex items-center mt-2">
                        <div className="flex -space-x-2">
                          {meeting.attendees.map((attendee, index) => (
                            <div key={index} className="w-6 h-6 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center text-xs">
                              {attendee[0]}
                            </div>
                          ))}
                        </div>
                        <span className="text-xs text-gray-500 ml-2">
                          {meeting.attendees.length} participants
                        </span>
                      </div>
                    </div>
                    <button className="mt-3 w-full px-3 py-1.5 text-sm bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors">
                      Join Meeting
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Create Meeting Modal */}
      {showCreateMeeting && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Create New Meeting</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input
                  type="text"
                  value={newMeetingTitle}
                  onChange={(e) => setNewMeetingTitle(e.target.value)}
                  className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter meeting title"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                <input
                  type="date"
                  value={newMeetingDate}
                  onChange={(e) => setNewMeetingDate(e.target.value)}
                  className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
                <input
                  type="time"
                  value={newMeetingTime}
                  onChange={(e) => setNewMeetingTime(e.target.value)}
                  className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                <select
                  value={newMeetingType}
                  onChange={(e) => setNewMeetingType(e.target.value as MeetingTypeKey)}
                  className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {Object.entries(meetingTypes).map(([type, { icon, label }]) => (
                    <option key={type} value={type}>
                      {icon} {label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex justify-end space-x-2 mt-6">
                <button
                  onClick={() => setShowCreateMeeting(false)}
                  className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreateMeeting}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Create Meeting
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* End Call Confirmation Modal */}
      {showEndCallConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex items-center justify-center mb-4">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
            </div>
            <h2 className="text-xl font-bold text-center mb-2">End Call?</h2>
            <p className="text-gray-600 text-center mb-6">
              Are you sure you want to end this call? This action cannot be undone.
            </p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => setShowEndCallConfirmation(false)}
                className="px-6 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleEndCall}
                className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                End Call
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 