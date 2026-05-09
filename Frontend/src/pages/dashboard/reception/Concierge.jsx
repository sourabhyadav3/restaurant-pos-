import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Search, 
  MessageSquare, 
  User, 
  Clock, 
  Send, 
  Check, 
  CheckCheck,
  Phone,
  Video,
  MoreVertical,
  X,
  Filter,
  Activity,
  History,
  CheckCircle2,
  AlertCircle,
  Users,
  Menu,
  ChevronLeft
} from 'lucide-react';
import { cn } from "../../../utils/cn";
import { useCommunication } from "../../../context/CommunicationContext";
import { useAuth } from "../../../context/AuthContext";

const Concierge = () => {
  const { messages, activeChats, sendMessage, markAsRead } = useCommunication();
  const navigate = useNavigate();
  const [selectedChatId, setSelectedChatId] = useState(activeChats[0]?.guestId || null);
  const [newMessage, setNewMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const messagesEndRef = useRef(null);

  const { user } = useAuth();

  const selectedChat = activeChats.find(c => c.guestId === selectedChatId);
  const chatMessages = messages.filter(m => m.guestId === selectedChatId);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (selectedChatId) {
      markAsRead(selectedChatId);
    }
  }, [selectedChatId, messages]);

  useEffect(() => {
    if (chatMessages.length > 0) {
      scrollToBottom();
    }
  }, [chatMessages]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedChat) return;
    sendMessage(selectedChat.guestId, selectedChat.guestName, newMessage, 'Staff');
    setNewMessage('');
  };

  const filteredChats = activeChats.filter(c => 
    c.guestName.toLowerCase().includes(searchQuery.toLowerCase()) || 
    c.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleBack = () => {
    const rolePrefix = user?.role?.toLowerCase() || 'admin';
    navigate(`/${rolePrefix}/dashboard`);
  };

  const handleOpenSidebar = () => {
    window.dispatchEvent(new CustomEvent('open-sidebar'));
  };

  return (
    <div className="flex-1 flex flex-col lg:flex-row gap-4 lg:gap-6 relative h-full pt-12 lg:pt-0">
      {/* Sidebar: Chat List */}
      <div className={cn(
        "w-full lg:w-80 xl:w-96 flex flex-col gap-4 shrink-0 overflow-hidden transition-all duration-300",
        selectedChatId && "hidden lg:flex"
      )}>
        <div className="flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <button 
              onClick={handleBack}
              className="lg:hidden p-2 bg-white rounded-xl shadow-sm border border-slate-100 text-slate-400 hover:text-primary transition-all mr-1"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white shadow-lg shadow-primary/20">
              <MessageSquare className="w-5 h-5 stroke-[2.5]" />
            </div>
            <h2 className="text-xl font-black text-text-primary uppercase tracking-tight">Concierge</h2>
          </div>
        </div>

        <div className="relative group shrink-0">
           <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 group-focus-within:text-primary transition-colors" />
           <input 
             type="text" 
             value={searchQuery}
             onChange={(e) => setSearchQuery(e.target.value)}
             placeholder="Search guests..." 
             className="w-full pl-11 pr-5 py-3 bg-white border border-slate-100 rounded-2xl outline-none shadow-sm text-sm font-bold focus:ring-4 focus:ring-primary/5 transition-all"
           />
        </div>

        <div className="flex-1 overflow-y-auto space-y-2 pr-1 scrollbar-hide">
           {filteredChats.map(chat => (
             <button 
               key={chat.guestId}
               onClick={() => setSelectedChatId(chat.guestId)}
               className={cn(
                 "w-full p-4 rounded-[2rem] border-2 transition-all flex items-center gap-4 text-left group relative overflow-hidden",
                 selectedChatId === chat.guestId 
                 ? "bg-primary text-white border-primary shadow-xl shadow-primary/20" 
                 : "bg-white text-text-primary border-transparent hover:bg-slate-50 shadow-sm"
               )}
             >
                <div className={cn(
                  "w-12 h-12 rounded-2xl flex items-center justify-center shadow-inner shrink-0",
                  selectedChatId === chat.guestId ? "bg-white/20" : "bg-slate-100"
                )}>
                   <User className={cn("w-6 h-6", selectedChatId === chat.guestId ? "text-white" : "text-slate-400")} />
                </div>
                <div className="flex-1 min-w-0">
                   <div className="flex justify-between items-center mb-1">
                      <h4 className="text-[11px] font-black uppercase truncate tracking-tight">{chat.guestName}</h4>
                      <span className={cn("text-[8px] font-black uppercase opacity-60", selectedChatId === chat.guestId ? "text-white" : "text-slate-300")}>
                         {new Date(chat.lastTimestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                   </div>
                   <p className={cn("text-[10px] font-bold truncate opacity-80 uppercase tracking-widest", selectedChatId === chat.guestId ? "text-white" : "text-slate-400")}>
                      {chat.lastMessage}
                   </p>
                </div>
                {chat.unreadCount > 0 && selectedChatId !== chat.guestId && (
                  <div className="absolute top-4 right-4 w-5 h-5 bg-primary text-white rounded-lg flex items-center justify-center text-[10px] font-black shadow-lg shadow-primary/20 animate-bounce">
                     {chat.unreadCount}
                  </div>
                )}
             </button>
           ))}
        </div>
      </div>

      {/* Main Content: Chat View */}
      <div className={cn(
        "flex-1 flex flex-col bg-white border-none shadow-2xl shadow-slate-200/50 rounded-2xl lg:rounded-[3rem] overflow-hidden min-w-0 transition-all duration-300",
        selectedChatId ? "mt-2 lg:mt-0" : "",
        !selectedChatId && "hidden lg:flex"
      )}>
        {!selectedChat ? (
          <div className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-50 p-6">
             <div className="w-20 lg:w-24 h-20 lg:h-24 bg-slate-50 rounded-[2rem] lg:rounded-[2.5rem] flex items-center justify-center">
                <MessageSquare className="w-10 lg:w-12 h-10 lg:h-12 text-slate-200" />
             </div>
             <div>
                <h3 className="text-lg font-black uppercase tracking-tight text-text-primary">No Chat Selected</h3>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Select a guest from the list to start messaging</p>
             </div>
          </div>
        ) : (
          <>
            {/* Chat Header */}
            <div className="py-6 px-4 lg:p-6 lg:px-8 border-b border-slate-50 bg-slate-50/30 flex items-center justify-between shrink-0">
               <div className="flex items-center gap-3 lg:gap-4">
                  <button 
                    onClick={() => setSelectedChatId(null)}
                    className="lg:hidden p-2 hover:bg-white rounded-xl transition-all"
                  >
                     <ChevronLeft className="w-6 h-6" />
                  </button>
                  <div className="w-10 lg:w-12 h-10 lg:h-12 bg-white rounded-2xl flex items-center justify-center text-primary shadow-sm shrink-0">
                     <User className="w-5 lg:w-6 h-5 lg:h-6" />
                  </div>
                  <div>
                     <h3 className="text-sm lg:text-lg font-black text-text-primary uppercase tracking-tight truncate max-w-[120px] sm:max-w-none">{selectedChat.guestName}</h3>
                     <div className="flex items-center gap-2 mt-0.5">
                        <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                        <span className="text-[8px] lg:text-[9px] font-black text-emerald-500 uppercase tracking-widest">Online</span>
                     </div>
                  </div>
               </div>
                <div className="flex items-center gap-1.5 lg:gap-3">
                   <button className="p-2 lg:p-3 bg-white rounded-2xl text-slate-400 hover:text-primary transition-all shadow-sm"><Phone className="w-4 h-4 lg:w-5 lg:h-5" /></button>
                   <button className="hidden sm:block p-3 bg-white rounded-2xl text-slate-400 hover:text-primary transition-all shadow-sm"><Video className="w-5 h-5" /></button>
                   <button className="p-2 lg:p-3 bg-white rounded-2xl text-slate-400 hover:text-primary transition-all shadow-sm"><MoreVertical className="w-4 h-4 lg:w-5 lg:h-5" /></button>
                </div>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-4 lg:p-8 space-y-6 scrollbar-hide bg-slate-50/20">
               {chatMessages.map(msg => {
                 const isStaff = msg.sender === 'Staff';
                 return (
                   <div key={msg.id} className={cn("flex flex-col", isStaff ? "items-end" : "items-start")}>
                      <div className={cn(
                        "max-w-[85%] lg:max-w-[70%] p-4 lg:p-5 rounded-[1.5rem] lg:rounded-[2rem] text-xs lg:text-sm font-bold leading-relaxed shadow-sm",
                        isStaff 
                        ? "bg-primary text-white rounded-tr-none" 
                        : "bg-white text-text-primary rounded-tl-none border border-slate-100"
                      )}>
                        {msg.content}
                      </div>
                      <div className={cn("flex items-center gap-2 mt-2 px-1", isStaff ? "flex-row-reverse" : "flex-row")}>
                        <span className="text-[8px] lg:text-[9px] font-black text-slate-300 uppercase tracking-widest">
                           {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                        {isStaff && (
                          <div className="flex items-center text-primary">
                            <CheckCheck className="w-3 h-3" />
                          </div>
                        )}
                      </div>
                   </div>
                 );
               })}
               <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 lg:p-8 border-t border-slate-50 bg-white shrink-0">
               <form onSubmit={handleSend} className="relative">
                  <input 
                    type="text" 
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type your reply..."
                    className="w-full pl-5 pr-16 py-4 lg:pl-6 lg:pr-20 lg:py-5 bg-slate-50 border border-slate-100 rounded-[1.5rem] lg:rounded-[2rem] outline-none text-xs lg:text-sm font-bold focus:ring-4 focus:ring-primary/5 transition-all"
                  />
                  <button 
                    type="submit"
                    disabled={!newMessage.trim()}
                    className="absolute right-2.5 lg:right-3 top-1/2 -translate-y-1/2 w-10 h-10 lg:w-12 lg:h-12 bg-primary text-white rounded-xl lg:rounded-2xl flex items-center justify-center shadow-lg shadow-primary/20 active:scale-90 transition-all disabled:opacity-50 disabled:scale-100"
                  >
                    <Send className="w-4 h-4 lg:w-5 lg:h-5 lg:ml-0.5" />
                  </button>
               </form>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Concierge;
