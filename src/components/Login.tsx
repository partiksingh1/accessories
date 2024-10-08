// "use client";
// import React, { useState } from 'react';
// import { useAuth } from '@/hooks/useAuth';
// import { useRouter } from 'next/navigation';

// const roles = ['SALESPERSON', 'DISTRIBUTOR','ADMIN'];

// export default function Login() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [role, setRole] = useState(roles[0]);
//   const [error, setError] = useState('');
//   const { login } = useAuth();
//   const router = useRouter();

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       await login(email, password, role);
//       router.push('/dashboard/admin'); // Redirect to Dashboard on success
//     } catch (err) {
//       setError('Invalid credentials. Please try again.');
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-50 p-8">
//       <div className="max-w-md w-full space-y-8">
//         <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
//           Sign in to your account
//         </h2>
//         <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
//           <div>
//             <label htmlFor="email" className="sr-only">Email address</label>
//             <input
//               id="email"
//               type="email"
//               required
//               placeholder="Email address"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className="block w-full px-3 py-2 border border-gray-300 rounded-md"
//             />
//           </div>
//           <div>
//             <label htmlFor="password" className="sr-only">Password</label>
//             <input
//               id="password"
//               type="password"
//               required
//               placeholder="Password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="block w-full px-3 py-2 border border-gray-300 rounded-md"
//             />
//           </div>
//           <div>
//             <label htmlFor="role" className="block text-sm font-medium text-gray-700">Role</label>
//             <select
//               id="role"
//               value={role}
//               onChange={(e) => setRole(e.target.value)}
//               className="mt-1 block w-full border-gray-300 rounded-md"
//             >
//               {roles.map((r) => (
//                 <option key={r} value={r}>
//                   {r.charAt(0).toUpperCase() + r.slice(1).toLowerCase()}
//                 </option>
//               ))}
//             </select>
//           </div>
//           {error && <div className="text-red-500 text-sm">{error}</div>}
//           <button type="submit" className="w-full bg-indigo-600 text-white py-2 rounded-md">Sign in</button>
//         </form>
//       </div>
//     </div>
//   );
// }
