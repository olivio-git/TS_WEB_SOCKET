import { useContext, useEffect, useState } from "react";
import ModalAuthLogin from "../components/ModalAuthLogin";
import { StateModal } from "../interfaces/Interfaces";
import Cookie from "js-cookie";
import DataContext from "../context/dataContext";
import axios from "axios";
export default function LandingPage() {
  //ContextForModals
  const { userLogin, handleSaveLogin } = useContext(DataContext);
  const [showModal, setShowModal] = useState(false);
  const [authLoginOpen, setAuthLoginOpen] = useState<StateModal>({
    estado: false,
  });
  const [authRegisterOpen, setAuthRegisterOpen] = useState<StateModal>({
    estado: false,
  });
  const handleChangeModalLogin = (estadoChange: boolean) => {
    //changeStateModalLogin
    setAuthLoginOpen({
      ...authLoginOpen,
      estado: estadoChange,
    });
  };
  const handleChangeModalRegister = (estado: boolean) => {
    //changeStateModalRegister
    setAuthRegisterOpen({
      ...authRegisterOpen,
      estado: estado,
    });
  };
  const valid = async () => { //validar secion sin eliminar token
    const token = await Cookie.get("jwt");
    if (token) {
      try {
        const response = await axios.post(
          "http://localhost:3001/api/user/auth/validate",
          { token }
        );
        handleSaveLogin({token:token,user:response.data.data.MessageChannel.user,valid:true});
      } catch (error) {
        Cookie.remove('jwt');
      }
    }
  };
  useEffect(() => {
    setShowModal(authLoginOpen.estado);
    valid();
  }, [authLoginOpen]);
  return (
    <div className="flex flex-col w-full bg-red-200 h-screen">
      {showModal ? (
        <ModalAuthLogin
          handleChangeModalLogin={handleChangeModalLogin}></ModalAuthLogin>
      ) : null}
      <header className="sm:w-12/12 h-20 sm:h-20 md:h-20 lg:h-20 xl:h-20 bg-green-100 ">
        <nav className="flex justify-end p-2">
          {userLogin.valid ? ( 
            <article className="transition-all duration-500 delay-200 p-2 bg-white shadow-md rounded-lg mr-4 cursor-pointer">
              <h1 className="font-semibold text-gray-700 text-lg">{userLogin.user?.user_name}</h1>
              <p className="text-gray-500 text-sm">@developer</p>
           </article>
          ) : (
            <button onClick={() => handleChangeModalLogin(true)}>
              Iniciar secion
            </button>
          )}
        </nav>
      </header>
      <main className="w-12/12 bg-yellow-100 flex-grow">
        <section>
          <article>
            Hola main
          </article>
        </section>
      </main>
    </div>
  );
}
