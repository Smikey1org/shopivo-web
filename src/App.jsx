import { AuthProvider } from "./context/AuthContext.jsx";
import { AppRoutes } from "./routes/AppRoutes.jsx";
import "./assets/styles.css";

function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}

export default App;
