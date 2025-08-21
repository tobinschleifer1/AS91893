// Simplified chatbot.js that integrates with Flask backend
let messages = [];
let isTyping = false;
let messageCounter = 0;

// Format time
function formatTime(date) {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

// Add message to chat
function addMessage(text, sender) {
    messageCounter++;
    const timestamp = new Date();
    
    const message = {
        id: messageCounter,
        text: text,
        sender: sender,
        timestamp: timestamp
    };

    messages.push(message);
    renderMessage(message);
    scrollToBottom();
}

// Render message in chat
function renderMessage(message) {
    const messagesContainer = document.getElementById('messagesContainer');
    if (!messagesContainer) {
        console.error('Messages container not found!');
        return;
    }

    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${message.sender}-message`;
    messageDiv.innerHTML = `
        <div class="message-content">
            <div class="message-avatar ${message.sender}-avatar">
                <i class="fas ${message.sender === 'user' ? 'fa-user' : 'fa-robot'}"></i>
            </div>
            <div class="message-bubble ${message.sender}-bubble">
                <p>${message.text}</p>
                <span class="message-time">${formatTime(message.timestamp)}</span>
            </div>
        </div>
    `;

    messagesContainer.appendChild(messageDiv);
}

// Show typing indicator
function showTypingIndicator() {
    isTyping = true;
    const typingIndicator = document.getElementById('typingIndicator');
    const sendButton = document.getElementById('sendButton');
    
    if (typingIndicator) typingIndicator.style.display = 'block';
    if (sendButton) sendButton.disabled = true;
    
    scrollToBottom();
}

// Hide typing indicator
function hideTypingIndicator() {
    isTyping = false;
    const typingIndicator = document.getElementById('typingIndicator');
    const sendButton = document.getElementById('sendButton');
    
    if (typingIndicator) typingIndicator.style.display = 'none';
    if (sendButton) sendButton.disabled = false;
}

// Scroll to bottom
function scrollToBottom() {
    setTimeout(() => {
        const messagesContainer = document.getElementById('messagesContainer');
        if (messagesContainer) {
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        }
    }, 100);
}

// Send message to Flask backend
async function sendMessageToBackend(message) {
    try {
        const response = await fetch('/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message: message })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        
        if (data.success) {
            return data.response;
        } else {
            throw new Error(data.error || 'Unknown error occurred');
        }
    } catch (error) {
        console.error('Backend communication error:', error);
        throw error;
    }
}

// Handle sending message
async function handleSendMessage() {
    const messageInput = document.getElementById('messageInput');
    if (!messageInput) {
        console.error('Message input not found!');
        return;
    }

    const message = messageInput.value.trim();
    console.log('Trying to send message:', message);
    
    if (!message || isTyping) {
        console.log('Message empty or bot is typing');
        return;
    }

    // Add user message
    addMessage(message, 'user');
    messageInput.value = '';
    messageInput.style.height = 'auto';

    // Show typing indicator
    showTypingIndicator();

    try {
        // Send message to Flask backend
        const response = await sendMessageToBackend(message);
        hideTypingIndicator();
        addMessage(response, 'bot');
    } catch (error) {
        console.error('Error getting response:', error);
        hideTypingIndicator();
        
        // Fallback response when backend fails
        const fallbackResponse = "I'm having trouble connecting to my knowledge base right now. " +
                               "Please try again in a moment, or ask me something more specific about " +
                               "workouts, nutrition, or fitness goals!";
        addMessage(fallbackResponse, 'bot');
    }
}

// Auto-resize textarea
function autoResize(textarea) {
    textarea.style.height = 'auto';
    textarea.style.height = textarea.scrollHeight + 'px';
}

// Initialize chatbot
function initializeChatbot() {
    console.log('Initializing chatbot...');
    
    // Check if elements exist
    const messageInput = document.getElementById('messageInput');
    const sendButton = document.getElementById('sendButton');
    const messagesContainer = document.getElementById('messagesContainer');
    
    if (!messageInput) {
        console.error('messageInput not found!');
        return;
    }
    if (!sendButton) {
        console.error('sendButton not found!');
        return;
    }
    if (!messagesContainer) {
        console.error('messagesContainer not found!');
        return;
    }

    console.log('All elements found, setting up event listeners...');

    // Send button click
    sendButton.onclick = function(e) {
        e.preventDefault();
        console.log('Send button clicked!');
        handleSendMessage();
    };
    
    // Enter key press
    messageInput.onkeydown = function(e) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            console.log('Enter key pressed!');
            handleSendMessage();
        }
    };

    // Auto-resize textarea
    messageInput.oninput = function() {
        autoResize(this);
    };

    // Suggestion buttons
    const suggestionButtons = document.querySelectorAll('.suggestion-btn');
    suggestionButtons.forEach(btn => {
        btn.onclick = function(e) {
            e.preventDefault();
            console.log('Suggestion clicked:', this.dataset.suggestion);
            messageInput.value = this.dataset.suggestion;
            messageInput.focus();
        };
    });

    // Clear the initial message from HTML and add it via JS for consistency
    messagesContainer.innerHTML = '';
    addMessage("Hi! I'm your personal workout assistant. I can help you with exercise routines, form tips, nutrition advice, and workout planning. What would you like to know?", 'bot');

    console.log('Chatbot initialized successfully!');
}

// Wait for DOM to load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeChatbot);
} else {
    initializeChatbot();
}