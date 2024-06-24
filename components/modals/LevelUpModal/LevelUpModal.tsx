import { Points } from "@/components/cards/Components/Points"
import Modal, { ModalProps } from "../BaseModal/BaseModal"
import StandardButton from "@/components/buttons/StandardButton/StandardButton"


const LevelUpModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {

    // TODO use session image url
    const imageUrl = 'https://i.imgur.com/NK6VNH9.png'
    return (
        <Modal isOpen={isOpen} onClose={onClose} className='w-[400px] h-[486px]'>
            <div className="flex flex-col items-center">
                <img src={imageUrl} alt="Level Up" className="w-[120px] h-[120px] mt-8" />
                <p className='text-neutral-300 mt-4'>CONGRATULATIONS!</p>
                <p className='text-neutral-800 italic text-4xl font-black'>YOU LEVELED UP!</p>
                <p className='text-neutral-800 mt-4 text-2xl'>You have received</p>
                <Points points={100} xp={100}/>
                <StandardButton onClick={onClose} className='mt-8 w-11/12'>OK</StandardButton>
            </div>
        </Modal>
    )
}

export default LevelUpModal