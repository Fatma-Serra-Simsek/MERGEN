  setMessages(prev => [...prev, { role: 'assistant', content: 'Mesaj gönderilirken bir hata oluştu.' }]);
} finally {
  setIsLoading(false);
}
};

return (
  <div className="w-full h-full bg-white rounded-2xl shadow-lg flex flex-col overflow-hidden relative">
 