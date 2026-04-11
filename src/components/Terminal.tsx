import React, { useState, useRef, useEffect } from 'react';

type HistoryEntry = {
    command: string;
    output: React.ReactNode;
};

export default function Terminal() {
    const [history, setHistory] = useState<HistoryEntry[]>([]);
    const [input, setInput] = useState('');
    const bottomRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [history]);

    useEffect(() => {
        setHistory([
            { command: '', output: 'Welcome to atomsOS v1.0.0.' },
            { command: '', output: 'Type "help" to see available commands.' }
        ]);
    }, []);

    const handleCommand = (e: React.FormEvent) => {
        e.preventDefault();
        const cmd = input.trim();
        if (!cmd) return;

        let output: React.ReactNode = '';
        const args = cmd.split(' ');
        const mainCommand = args[0].toLowerCase();

        switch (mainCommand) {
            case 'help':
                output = (
                    <div>
                        Available commands:<br />
                        - <strong style={{ color: 'var(--accent)' }}>about</strong>:   Learn more about me<br />
                        - <strong style={{ color: 'var(--accent)' }}>ls</strong>:      View available pages on this site<br />
                        - <strong style={{ color: 'var(--accent)' }}>cd &lt;dir&gt;</strong>: Navigate to a page (e.g. 'cd blog')<br />
                        - <strong style={{ color: 'var(--accent)' }}>clear</strong>:   Clear the terminal history<br />
                        - <strong style={{ color: 'var(--accent)' }}>echo</strong>:    Print text back to the terminal<br />
                        - <strong style={{ color: 'var(--accent)' }}>whoami</strong>:  Print current user<br />
                        - <strong style={{ color: 'var(--accent)' }}>hire</strong>:    Proceed to hire page
                    </div>
                );
                break;
            case 'about':
                output = 'Welcome visitor, myself atoms19. I am a programmer who codes most of his freetime away. I love web development, system programming, linux, and manga. I am open to commissioned projects.';
                break;
            case 'ls':
                output = (
                    <div style={{ display: 'flex', gap: '1rem', color: 'var(--accentDark)' }}>
                        <span>blog/</span>
                        <span>contact/</span>
                        <span>hire/</span>
                        <span>coo/</span>
                    </div>
                );
                break;
            case 'cd':
            case 'open':
                const target = args[1]?.toLowerCase();
                if (!target) {
                    output = 'cd: missing operand';
                } else if (['blog', 'contact', 'hire', 'coo'].includes(target)) {
                    output = `Navigating to /${target}...`;
                    setTimeout(() => {
                        window.location.href = `/${target}`;
                    }, 500);
                } else if (target === '..') {
                    output = 'Already at root level.';
                } else {
                    output = `cd: ${target}: No such file or directory`;
                }
                break;
            case 'hire':
                output = 'Navigating to /hire...';
                setTimeout(() => {
                    window.location.href = `/hire`;
                }, 500);
                break;
            case 'clear':
                setHistory([]);
                setInput('');
                return;
            case 'echo':
                output = args.slice(1).join(' ');
                break;
            case 'whoami':
                output = 'visitor';
                break;
            case 'sudo':
                output = 'visitor is not in the sudoers file. This incident will be reported.';
                break;
            default:
                output = `bash: ${mainCommand}: command not found. Type "help" for a list of commands.`;
        }

        setHistory((prev) => [...prev, { command: cmd, output }]);
        setInput('');
    };

    return (
        <div
            className="terminal-container"
            style={{
                background: '#0a0a0a',
                border: '1px solid var(--accentLight)',
                padding: '1.5rem',
                fontFamily: '"Fira Code", "Courier New", Courier, monospace',
                fontSize: '0.95rem',
                height: '400px',
                overflowY: 'auto',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.8rem',
                boxShadow: '0 0 15px rgba(0,0,0,0.8), inset 0 0 10px rgba(0,0,0,0.5)',
                marginTop: '2rem',
                marginBottom: '2rem'
            }}
            onClick={() => {
                const inputEl = document.getElementById('terminal-input');
                if (inputEl) inputEl.focus();
            }}
        >
            <div style={{ color: 'var(--accentDark)', marginBottom: '1rem' }}>
                <pre style={{ margin: 0, padding: 0, border: 'none', background: 'transparent', color: 'var(--accent)', fontSize: '0.7rem' }}>
                    {`
   __                        ______ ___ 
  / /____  _________ ___  _ /_  __//_  |
 / __/ _ \\/ ___/ __ \`__ \\/ __/ /    / / 
/ /_/  __/ /  / / / / / / /_/ /    / /  
\\__/\\___/_/  /_/ /_/ /_/\\__/_/    /_/   
          `}
                </pre>
            </div>

            {history.map((entry, i) => (
                <div key={i} style={{ lineHeight: '1.5' }}>
                    {entry.command && (
                        <div style={{ color: 'var(--fg)' }}>
                            <span style={{ color: 'var(--accent)' }}>visitor@atoms19:~$</span> {entry.command}
                        </div>
                    )}
                    <div style={{ color: '#aaa', marginTop: '0.3rem', whiteSpace: 'pre-wrap' }}>{entry.output}</div>
                </div>
            ))}
            <form onSubmit={handleCommand} style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', marginTop: '0.5rem' }}>
                <span style={{ color: 'var(--accent)', whiteSpace: 'nowrap' }}>visitor@atoms19:~$</span>
                <input
                    id="terminal-input"
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    autoFocus
                    autoComplete="off"
                    spellCheck="false"
                    style={{
                        flex: 1,
                        background: 'transparent',
                        border: 'none',
                        color: 'var(--fg)',
                        fontFamily: 'inherit',
                        fontSize: 'inherit',
                        outline: 'none',
                        caretColor: 'var(--accent)'
                    }}
                />
            </form>
            <div ref={bottomRef} />

            <style>{`
        /* Minimal custom scrollbar for terminal */
        .terminal-container::-webkit-scrollbar {
          width: 8px;
        }
        .terminal-container::-webkit-scrollbar-track {
          background: #000;
        }
        .terminal-container::-webkit-scrollbar-thumb {
          background: var(--accentLight);
          border-radius: 4px;
        }
      `}</style>
        </div>
    );
}
