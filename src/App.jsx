// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Login from "./pages/auth/login";
// import RegisterUser from "./pages/auth/register";
// import { Dashboard } from "./pages/auth/dashboard/dashboard";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// const queryClient = new QueryClient();

// function App() {
//   return (
//     <QueryClientProvider client={queryClient}>
//       <Router>
//         <Routes>
//           <Route path="/dashboard" element={<Dashboard />} />
//           <Route path="/" element={<Login />} />
//           <Route path="/register" element={<RegisterUser />} />
//         </Routes>
//       </Router>
//     </QueryClientProvider>
//   );
// }

// export default App;
import React from 'react'

function App() {
  return (
    <div className='text-3xl font-bold underline text-red-500'>Hello World!</div>
  )
}
export default App;