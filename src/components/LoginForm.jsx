import { useState } from 'react';
import axios from 'axios';

const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        // Prevents default behaviour of the browser - refresh
        e.preventDefault();

        // Authenticate user login
        const authObject = { 'Project-ID': "81fdd687-64cf-425c-96a1-0ebb3ecc2fd7", 'User-Name': username, 'User-Secret': password };

        try {
            // Get messages for the username, password from chatengine
            await axios.get('https://api.chatengine.io/chats', { headers: authObject });
            // Now, User logs in...

            // Store password to local storage to avoid repeated logins
            localStorage.setItem('username', username);
            localStorage.setItem('password', password);

            // Reload page
            window.location.reload();

        } catch (error) {
            // Login credentials mismatch
            setError('Incorrect username / password')
        }
    }

    return (
        <div className="wrapper">
            <div className="form">

                <h1 className="title">Login to Chatter</h1>
                
                <form onSubmit={handleSubmit}>
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="input" placeholder="Username" required />
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="input" placeholder="Password" required />
                
                    <div align='center'>
                        <button type="submit" className="button">
                            <span>Start Chatting</span>
                        </button>
                    </div>
                    <h2 className="error">{error}</h2>
                </form>
                
                <footer className="error">Made with 💛 by Tridib</footer>

            </div>
            
        </div>
    );
}

export default LoginForm;