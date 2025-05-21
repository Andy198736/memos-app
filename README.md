<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Sistema de gestión de memorandums de autorización para camiones">
    <meta name="keywords" content="memorandum, camiones, autorización, gestión, sistema">
    <meta property="og:title" content="Sistema de Memorandums">
    <meta property="og:description" content="Sistema de gestión de memorandums de autorización para camiones">
    <meta name="twitter:card" content="summary">
    <meta name="twitter:title" content="Sistema de Memorandums">
    <meta name="twitter:description" content="Sistema de gestión de memorandums de autorización para camiones">
    <title>Sistema de Memorandums</title>
    <script src="https://resource.trickle.so/vendor_lib/unpkg/react@18/umd/react.production.min.js"></script>
    <script src="https://resource.trickle.so/vendor_lib/unpkg/react-dom@18/umd/react-dom.production.min.js"></script>
    <script src="https://resource.trickle.so/vendor_lib/unpkg/@babel/standalone/babel.min.js"></script>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" rel="stylesheet">
    <link href="styles/main.css" rel="stylesheet">
    <link href="styles/auth.css" rel="stylesheet">
    <link href="styles/dashboard.css" rel="stylesheet">
    <link href="styles/landing.css" rel="stylesheet">
    <audio id="notificationSound" src="https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3" preload="auto"></audio>
</head>
<body>
    <div id="root"></div>
    <script type="text/babel" src="utils/dateUtils.js"></script>
    <script type="text/babel" src="utils/validateUtils.js"></script>
    <script type="text/babel" src="utils/exportUtils.js"></script>
    <script type="text/babel" src="utils/notificationUtils.js"></script>
    <script type="text/babel" src="data/communes.js"></script>
    <script type="text/babel" src="components/Common/Alert.js"></script>
    <script type="text/babel" src="components/Common/Notification.js"></script>
    <script type="text/babel" src="components/Common/ExpiringAlert.js"></script>
    <script type="text/babel" src="components/Landing/LandingPage.js"></script>
    <script type="text/babel" src="components/Auth/LoginForm.js"></script>
    <script type="text/babel" src="components/Auth/RegisterForm.js"></script>
    <script type="text/babel" src="components/Dashboard/Navbar.js"></script>
    <script type="text/babel" src="components/Dashboard/MemoList.js"></script>
    <script type="text/babel" src="components/Dashboard/MemoForm.js"></script>
    <script type="text/babel" src="components/Dashboard/UserManagement.js"></script>
    <script type="text/babel" src="components/Dashboard/BlockedClients.js"></script>
    <script type="text/babel" src="app.js"></script>
</body>
</html>
