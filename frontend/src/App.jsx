function App() {
  console.log(import.meta.env);

  return (
    <div>
      <h1>{import.meta.env.VITE_APP_NAME}</h1>
      <p>{import.meta.env.VITE_API_URL}</p>
    </div>
  );
}

export default App;