import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Layout from './layout/Layout';
import { io } from 'socket.io-client';

let socket;
const Complain = () => {
    const [contact, setContact] = useState(null)
    const [contacts, setContacts] = useState([])
    const [messages, setMessages] = useState([])
    const [form ,setForm]=useState("");
    const user = useSelector((state)=>state.user);

    console.log("contacts data => " ,contacts);
    console.log("contact data => " ,contact);
    console.log("message data => " ,messages);
    console.log("user=> ", user);

    useEffect(() => {
      console.log(
        "use effect runing scket io =>",
        `${process.env.REACT_APP_URL}`
      );
      socket = io(`${process.env.REACT_APP_URL}`, {
        auth: { token: user.token },
      });

      socket.on("new message", () => {
        socket.emit("load messages", contact?.id);
      });

      loadContact();
      loadMessages();

      socket.on("connect_error", (err) => {
        console.error(err);
      });

      return () => {
        socket.disconnect();
      };
    }, [messages]);

    const loadMessages = () => {
      socket.on("messages", async (data) => {
        if (data.length > 0) {
          setMessages(data);
        } else {
          setMessages([]);
          loadContact();
        }
      });
    };

    const loadContact = () => {
      // emit event to load  contact
      socket.emit(`load ${user.status === "ADMIN" ? "USER" : "ADMIN"} contact`);
      // listen event to get  contact
      socket.on(
        `${user.status === "ADMIN" ? "USER" : "ADMIN"} contact`,
        (data) => {
          setContacts(data);
          if (contact === null && user.status === "USER") {
            setContact(data);
            socket.emit("load messages", data.id);
          }
        }
      );
    };

    const onClickContact = (data) => {
      setContact(data);
      socket.emit("load messages", data.id);
    };

    const onSendMessage = () => {
      const data = {
        idreceiver: contact.id,
        chat: form,
      };
      console.log(data);

      socket.emit("send message", data);
      setForm("");
    };

    return (
      <Layout>
        <div className="flex justify-center min-h-[78vh] ">
          <div className="w-[65rem] gap-3 flex">
            {user.status === "ADMIN" ? (
              <div className=" bg-zinc-200 rounded w-1/4 h-max">
                <hr />
                {contacts.map((item) => (
                  <div
                    className=" flex h-20 gap-5 items-center"
                    onClick={() => {
                      onClickContact(item);
                    }}
                  >
                    <img
                      src={
                        item.avatar
                          ? `${process.env.REACT_APP_URL}/public/image/${item.avatar}`
                          : "/201025-M-AB981-003.jpeg"
                      }
                      className=" w-14  object-cover ml-3 h-14 rounded-full"
                      alt=""
                    />
                    <p>{item.fullName}</p>
                  </div>
                ))}
                <hr />
              </div>
            ) : (
              ""
            )}

            <div
              className={
                user.status === "ADMIN"
                  ? contact === null
                    ? " hidden"
                    : "rounded w-3/4 bg-zinc-200"
                  : "rounded w-full bg-zinc-200"
              }
            >
              <div className="h-fit mb-2 rounded ">
                <div className="flex items-center h-16 gap-3 bg-zinc-300 rounded-t">
                  <img
                    src={
                      contact?.avatar !== null
                        ? `${process.env.REACT_APP_URL}/public/image/${contact?.avatar}`
                        : "/201025-M-AB981-003.jpeg"
                    }
                    className=" w-10  object-cover ml-3 h-10 rounded-full"
                    alt=""
                  />
                  <div>
                    <p className=" font-semibold">{contact?.fullName}</p>
                    {/* <p className='font-thin flex gap-2'> <div className='h-2 w-2 rounded bg-green-600 mt-2 '></div>  online</p> */}
                  </div>
                </div>
                <div className=" h-[21.5rem] overflow-x-auto ">
                  {messages.map((chat) => (
                    <div
                      key={chat.id}
                      className={
                        chat.idsender === user.id
                          ? "flex justify-end mt-2 px-2"
                          : "mt-2 px-2"
                      }
                    >
                      <p className=" bg-white text-slate-800 px-2 py-3 rounded w-fit max-w-[50%]">
                        {chat.chat}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex gap-2 py-1 px-1">
                <input
                  type="text"
                  value={form}
                  onChange={(e) => {
                    setForm(e.target.value);
                  }}
                  placeholder="Type here"
                  className="input input-bordered input-sm w-full "
                />
                <button
                  onClick={() => {
                    onSendMessage();
                  }}
                  className=" bg-cyan-200 rounded w-14"
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
}

export default Complain;
