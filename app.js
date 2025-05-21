function App() {
    try {
        const [user, setUser] = React.useState(null);
        const [showNewMemo, setShowNewMemo] = React.useState(false);
        const [showUserManagement, setShowUserManagement] = React.useState(false);
        const [showLanding, setShowLanding] = React.useState(true);
        const [notification, setNotification] = React.useState(null);
        const [expiringMemos, setExpiringMemos] = React.useState([]);

        const checkExpiringMemos = React.useCallback(async () => {
            if (!user) return;
            try {
                const result = await trickleListObjects('memo', 1000, true);
                const memos = result.items || [];
                const today = new Date();
                today.setHours(0, 0, 0, 0);

                // Only show memos that expire today in the notification
                const expiring = memos.filter(memo => {
                    const endDate = new Date(memo.objectData.endDate);
                    const userTimezoneOffset = endDate.getTimezoneOffset() * 60000;
                    const adjustedEndDate = new Date(endDate.getTime() + userTimezoneOffset);
                    adjustedEndDate.setHours(0, 0, 0, 0);
                    return adjustedEndDate.getTime() === today.getTime();
                });

                // Cleanup expired notifications
                cleanupExpiredNotifications();

                setExpiringMemos(expiring);

                // Create notifications for memos expiring today
                if (expiring.length > 0) {
                    await trickleCreateObject('memo_notification', {
                        type: 'warning',
                        message: `${expiring.length} memorándum(s) vencen hoy`,
                        createdAt: new Date().toISOString()
                    });
                }
            } catch (error) {
                console.error('Error checking expiring memos:', error);
            }
        }, [user]);

        React.useEffect(() => {
            if (user) {
                checkExpiringMemos();
                // Check every minute
                const interval = setInterval(checkExpiringMemos, 60000);
                return () => clearInterval(interval);
            }
        }, [user, checkExpiringMemos]);

        const handleLogin = (userData) => {
            setUser(userData);
            setShowLanding(false);
            setNotification({
                type: 'success',
                message: `Bienvenido, ${userData.objectData.username}!`
            });
        };

        const handleLogout = () => {
            setUser(null);
            setShowLanding(true);
            setExpiringMemos([]);
        };

        const handleMemoSave = async () => {
            setShowNewMemo(false);
            
            // Create notification for all users
            await trickleCreateObject('memo_notification', {
                type: 'info',
                message: 'Nuevo memorándum agregado',
                createdAt: new Date().toISOString()
            });

            setNotification({
                type: 'success',
                message: 'Memorándum guardado exitosamente'
            });
            
            // Play sound for new memo
            playNotificationSound();
            checkExpiringMemos();
        };

        if (showLanding && !user) {
            return <LandingPage onStartClick={() => setShowLanding(false)} />;
        }

        if (!user) {
            return <LoginForm onLogin={handleLogin} />;
        }

        return (
            <div className="min-h-screen bg-gray-100" data-name="app-container">
                {notification && (
                    <Notification
                        message={notification.message}
                        type={notification.type}
                        onClose={() => setNotification(null)}
                    />
                )}
                {expiringMemos.length > 0 && (
                    <ExpiringAlert memos={expiringMemos} />
                )}
                <Navbar user={user} onLogout={handleLogout} />
                
                <div className="container mx-auto px-4 py-8">
                    <div className="grid grid-cols-1 gap-8">
                        <div className="flex justify-between items-center">
                            <h1 className="text-2xl font-bold text-gray-800">
                                Sistema de Memorándums
                            </h1>
                            <div className="flex gap-2">
                                {user.objectData.isAdmin && (
                                    <button
                                        onClick={() => setShowUserManagement(!showUserManagement)}
                                        className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600"
                                        data-name="toggle-users-button"
                                    >
                                        <span>
                                            <i className="fas fa-users mr-2"></i>
                                            Gestión Usuarios
                                        </span>
                                    </button>
                                )}
                                <button
                                    onClick={() => setShowNewMemo(!showNewMemo)}
                                    className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
                                    data-name="toggle-form-button"
                                >
                                    <span>
                                        <i className="fas fa-plus mr-2"></i>
                                        Nuevo Memo
                                    </span>
                                </button>
                            </div>
                        </div>

                        {showUserManagement && user.objectData.isAdmin && (
                            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                                <UserManagement />
                            </div>
                        )}

                        {showNewMemo && (
                            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                                <MemoForm onSave={handleMemoSave} />
                            </div>
                        )}

                        <BlockedClients isAdmin={user.objectData.isAdmin} />

                        <MemoList 
                            isAdmin={user.objectData.isAdmin} 
                            onNotification={(notif) => {
                                setNotification(notif);
                            }}
                        />
                    </div>
                </div>
            </div>
        );
    } catch (error) {
        console.error('App error:', error);
        reportError(error);
        return null;
    }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
