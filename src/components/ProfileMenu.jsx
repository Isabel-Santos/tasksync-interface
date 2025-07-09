// // import React, { useState, useEffect, useRef } from 'react';
// // import { FiUser, FiLogOut } from 'react-icons/fi';

// // const ProfileMenu = ({ onLogout, user }) => {
// //   const [isOpen, setIsOpen] = useState(false);
// //   const menuRef = useRef(null);

// //   useEffect(() => {
// //     const handleClickOutside = (event) => {
// //       if (menuRef.current && !menuRef.current.contains(event.target)) {
// //         setIsOpen(false);
// //       }
// //     };
// //     document.addEventListener("mousedown", handleClickOutside);
// //     return () => document.removeEventListener("mousedown", handleClickOutside);
// //   }, []);

// //   const defaultAvatar = "/avatar-padrao.png"; // Usando o método da pasta public

// //   return (
// //     <div className="relative" ref={menuRef}>
// //       <button
// //         onClick={() => setIsOpen(!isOpen)}
// //         className="rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
// //         title="Menu de Perfil"
// //       >
// //         <img
// //           className="w-10 h-10 rounded-full object-cover"
// //           src={user?.avatar_url || defaultAvatar}
// //           alt="Avatar do usuário"
// //         />
// //       </button>

// //       {isOpen && (
// //         <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 ring-1 ring-black ring-opacity-5">
// //           <a href="#" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
// //             <FiUser className="mr-3" /> Ver Perfil
// //           </a>
// //           <button
// //             onClick={onLogout}
// //             className="w-full text-left flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
// //           >
// //             <FiLogOut className="mr-3" /> Sair
// //           </button>
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default ProfileMenu;

// // import React, { useState, useEffect, useRef } from 'react';
// // import { FiUser, FiLogOut } from 'react-icons/fi';

// // const ProfileMenu = ({ onLogout, user }) => {
// //   const [isOpen, setIsOpen] = useState(false);
// //   const menuRef = useRef(null);

// //   useEffect(() => {
// //     const handleClickOutside = (event) => {
// //       if (menuRef.current && !menuRef.current.contains(event.target)) {
// //         setIsOpen(false);
// //       }
// //     };
// //     document.addEventListener("mousedown", handleClickOutside);
// //     return () => document.removeEventListener("mousedown", handleClickOutside);
// //   }, []);

// //   // Define uma imagem padrão caso a do usuário não carregue
// //   const defaultAvatar = "/avatar-padrao.png";

// //   return (
// //     <div className="relative" ref={menuRef}>
// //       <button
// //         onClick={() => setIsOpen(!isOpen)}
// //         className="rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
// //         title="Menu de Perfil"
// //       >
// //         {/* MUDANÇA: Garante que a imagem seja renderizada corretamente */}
// //         <img
// //           className="w-10 h-10 rounded-full object-cover" // A classe 'rounded-full' garante o formato de círculo
// //           src={user?.avatar_url || defaultAvatar}
// //           alt="Avatar do usuário"
// //         />
// //       </button>

// //       {isOpen && (
// //         <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 ring-1 ring-black ring-opacity-5">
// //           <a href="#" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
// //             <FiUser className="mr-3" /> Ver Perfil
// //           </a>
// //           <button
// //             onClick={onLogout}
// //             className="w-full text-left flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
// //           >
// //             <FiLogOut className="mr-3" /> Sair
// //           </button>
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default ProfileMenu;

// import React, { useState, useEffect, useRef } from 'react';
// import { FiUser, FiLogOut } from 'react-icons/fi';

// const ProfileMenu = ({ onLogout, user }) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const menuRef = useRef(null);

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (menuRef.current && !menuRef.current.contains(event.target)) {
//         setIsOpen(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   // Usa a imagem da pasta /public como padrão
//   const defaultAvatar = "/avatar-padrao.png";

//   return (
//     <div className="relative" ref={menuRef}>
//       <button
//         onClick={() => setIsOpen(!isOpen)}
//         className="rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//         title="Menu de Perfil"
//       >
//         {/* A tag <img> é usada aqui para exibir a foto */}
//         <img
//           className="w-10 h-10 rounded-full object-cover"
//           src={user?.avatar_url || defaultAvatar}
//           alt="Avatar do usuário"
//         />
//       </button>

//       {isOpen && (
//         <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 ring-1 ring-black ring-opacity-5">
//           <a href="#" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
//             <FiUser className="mr-3" /> Ver Perfil
//           </a>
//           <button
//             onClick={onLogout}
//             className="w-full text-left flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
//           >
//             <FiLogOut className="mr-3" /> Sair
//           </button>
//         </div>
//       )}
//     </div>
//   );
//   return <div>Menu</div>
// };

// export default ProfileMenu;