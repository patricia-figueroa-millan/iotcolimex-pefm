const ForgotPassword = () => {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          gap: "20px",
          backgroundColor: "#2D3748",
          color: "#E2E8F0",
        }}
      >
        <h1>Recuperar contraseña</h1>
        <p>
          Por favor, ingresa tu correo electrónico para recibir un enlace de
          recuperación.
        </p>
        <input
          type="email"
          placeholder="Correo electrónico"
          style={{
            padding: "10px",
            borderRadius: "5px",
            border: "1px solid #A0AEC0",
            width: "80%",
          }}
        />
        <button
          style={{
            padding: "10px 20px",
            backgroundColor: "#3182CE",
            color: "#FFFFFF",
            border: "none",
            borderRadius: "5px",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          Enviar
        </button>
      </div>
    );
  };
  
  export default ForgotPassword;
  