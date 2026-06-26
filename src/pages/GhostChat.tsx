import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, User, Sparkles } from 'lucide-react';
import GhostWindow from '../components/GhostWindow';
import type { ChatMessage } from '../types';

const quickQuestions = [
  'Should I carry an umbrella?',
  'Should I wear a jacket?',
  'Is it picnic weather?',
  'Will tomorrow be better?',
  'How is the sky feeling?',
  'Is it a good day to fly a kite?',
];

const ghostResponses: Record<string, string> = {
  'umbrella': "Hmm, let me check... The clouds look a bit teary today. I would bring an umbrella just in case the sky decides to have a moment. Better safe than soggy!",
  'jacket': "Ooh, it is a bit nippy out there! The wind has opinions today. I would definitely wear a jacket unless you want to experience what I feel like on a daily basis... breezy!",
  'picnic': "Picnic weather? Let me consult the cloud spirits... Actually, the clouds are being pretty cooperative today! Low rain chance, gentle breeze. Pack those sandwiches!",
  'tomorrow': "Tomorrow? The forecast says... *squints at crystal ball* ... it will be 20% more pleasant with a chance of unexpected joy! Or rain. But mostly joy!",
  'sky': "The sky? Oh honey, the sky is THRIVING today. Barely any sadness in those clouds. I would say it is at a solid 15% melancholy, which is basically sky-code for 'I am fine, thanks for asking.'",
  'kite': "Kite flying? The wind is doing a gentle dance at about 12km/h. Perfect for kites! Not too wild, not too calm. The wind is in a cooperative mood today.",
};

function getGhostResponse(input: string): string {
  const lower = input.toLowerCase();
  for (const [key, response] of Object.entries(ghostResponses)) {
    if (lower.includes(key)) return response;
  }

  const defaultResponses = [
    "That is a great question! Let me consult my cloud friends... They say it is going to be absolutely fine. Trust the process!",
    "Ooh, I sense some weather curiosity! Based on my ghostly intuition, I would say dress in layers and keep a positive attitude. Works every time!",
    "The spirits of meteorology whisper... *wiggles fingers mysteriously* ... they say you should look out the window. But also check the app, just to be sure!",
    "As a certified weather ghost, my professional opinion is: wear whatever makes you happy! The weather will do what it wants anyway. We are all just along for the ride!",
    "Interesting question! The barometric pressure is doing a thing, the humidity is at a level, and my ghost senses are tingling. In summary: probably bring a light jacket!",
  ];
  return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
}

export default function GhostChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'ghost',
      content: "Hello friend! I am Casper, your personal weather ghost. Ask me anything about the weather, and I shall consult the clouds for you!",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const sendMessage = (content: string) => {
    if (!content.trim()) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const ghostMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'ghost',
        content: getGhostResponse(content),
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, ghostMsg]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  return (
    <div className="max-w-3xl mx-auto h-[calc(100vh-140px)] flex flex-col">
      <GhostWindow
        title="ghost_chat.exe"
        icon={<Sparkles className="w-4 h-4 text-primary" />}
        titleBarColor="pink"
        className="flex-1 flex flex-col"
      >
        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-md space-y-md custom-scrollbar">
          <AnimatePresence>
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                className={`flex gap-sm ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                {/* Avatar */}
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    msg.role === 'ghost'
                      ? 'bg-primary-container'
                      : 'bg-secondary-container'
                  }`}
                >
                  {msg.role === 'ghost' ? (
                    <img
                      src="/ghosts/Normal-ghost.png"
                      alt=""
                      className="w-6 h-6 object-contain"
                      style={{ imageRendering: 'pixelated' }}
                    />
                  ) : (
                    <User className="w-4 h-4 text-secondary" />
                  )}
                </div>

                {/* Bubble */}
                <div
                  className={`max-w-[75%] px-md py-sm rounded-xl ${
                    msg.role === 'ghost'
                      ? 'bg-surface-container-low border border-outline-variant'
                      : 'bg-primary text-white'
                  }`}
                >
                  <p
                    className={`font-fredoka text-body-md ${
                      msg.role === 'ghost' ? 'text-on-surface' : 'text-white'
                    }`}
                  >
                    {msg.content}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Typing Indicator */}
          {isTyping && (
            <motion.div
              className="flex gap-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div className="w-8 h-8 rounded-full bg-primary-container flex items-center justify-center">
                <img
                  src="/ghosts/Normal-ghost.png"
                  alt=""
                  className="w-6 h-6 object-contain"
                  style={{ imageRendering: 'pixelated' }}
                />
              </div>
              <div className="bg-surface-container-low border border-outline-variant px-md py-sm rounded-xl">
                <div className="flex gap-1">
                  {[0, 1, 2].map((i) => (
                    <motion.div
                      key={i}
                      className="w-2 h-2 bg-primary rounded-full"
                      animate={{ y: [0, -4, 0] }}
                      transition={{
                        duration: 0.6,
                        repeat: Infinity,
                        delay: i * 0.15,
                      }}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Questions */}
        {messages.length < 3 && (
          <div className="px-md pb-sm">
            <p className="font-nunito text-label-sm text-on-surface-variant mb-2">
              Quick Questions:
            </p>
            <div className="flex flex-wrap gap-xs">
              {quickQuestions.map((q) => (
                <motion.button
                  key={q}
                  onClick={() => sendMessage(q)}
                  className="px-3 py-1.5 bg-surface-container-low border border-outline-variant rounded-full font-fredoka text-body-md text-on-surface-variant hover:border-primary hover:text-primary transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {q}
                </motion.button>
              ))}
            </div>
          </div>
        )}

        {/* Input */}
        <form onSubmit={handleSubmit} className="p-md border-t border-outline-variant">
          <div className="flex gap-sm">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask your weather ghost anything..."
              className="flex-1 bg-surface-container-low border-2 border-outline-variant rounded-xl px-md py-sm font-fredoka text-body-md text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:border-primary transition-colors"
            />
            <motion.button
              type="submit"
              disabled={!input.trim() || isTyping}
              className="px-4 py-sm bg-primary text-white rounded-xl font-pixel text-label-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Send className="w-4 h-4" />
            </motion.button>
          </div>
        </form>
      </GhostWindow>
    </div>
  );
}
