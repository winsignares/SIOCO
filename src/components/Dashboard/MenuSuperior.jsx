
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

import { Avatar,AvatarImage} from "../Icons";

export const MenuSuperior = ({ toggleSidebar, username }) => {
    return (
        <header className="bg-indigo-700 z-10">
            <div className=" mx-auto px-4">
                <div className="flex justify-between items-center py-3">
                    <div className="flex items-center">
                        <button onClick={toggleSidebar} className=" text-white hover:text-indigo-200">
                            <FontAwesomeIcon icon={faBars} />
                        </button>
                        <h1 className="text-center font-semibold text-white ml-2">Dental Clinic</h1>
                    </div>

                    <div className="flex items-center">
                        <Avatar className="h-8 w-8 mr-2">
                            <AvatarImage src="https://cdn-icons-png.flaticon.com/512/1144/1144760.png" />
                        </Avatar>
                        <span className="text-sm font-medium text-white">{username}</span>
                    </div>
                </div>
            </div>
        </header>
    )
}
