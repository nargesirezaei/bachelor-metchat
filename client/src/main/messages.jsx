import { Flex } from "../components/Flex";
import { TopNav } from "../components/top-nav";
import profile from "../assets/img/profile.svg";
import face from "../assets/img/face.png";
import { Contact } from "../components/contact";
import Nav from "../components/MainNav";

export const Messages = () => {
    return (
        <>
            <Nav />
            <Flex content="space-between">
                <div
                    className="border-end p-3 "
                    style={{ width: 350 }}
                    id="left-side"
                >
                    <input
                        type="search"
                        class="form-control rounded"
                        placeholder="Search"
                        aria-label="Search"
                        aria-describedby="search-addon"
                    />
                    <Contact />
                    <Contact />
                    <Contact />
                    <Contact />
                    <Contact />
                </div>
                <div className="flex-grow-1">
                    <Flex
                        align="center"
                        content="center"
                        className="border-bottom p-3"
                    >
                        <Contact />
                    </Flex>
                    <Flex
                        vertical
                        content="space-between"
                        style={{ height: 500 }}
                    >
                        <div className="p-3">chats</div>

                        <input
                            type="text"
                            className="message-input m-2 p-3"
                            placeholder="message..."
                        />
                    </Flex>
                </div>
                <div
                    className="border-start p-3 text-center"
                    style={{ width: 350 }}
                >
                    <img src={face} />
                    <Flex content="center" className="w-100">
                        <Flex align="center" vertical className="mt-4">
                            <img
                                src={profile}
                                alt="profil-icon"
                                style={{ width: 35, height: 35 }}
                            />
                            <a href="">profile</a>
                        </Flex>
                        <Flex align="center" vertical className="mt-4">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="35"
                                height="35"
                                fill="currentColor"
                                class="bi bi-search"
                                viewBox="0 0 16 16"
                            >
                                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"></path>
                            </svg>
                            <a href="">Søk i chat</a>
                        </Flex>
                    </Flex>
                </div>
            </Flex>
        </>
    );
};
