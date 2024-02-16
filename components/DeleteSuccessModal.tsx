import Image from "next/image";
import { Button } from ".";
import { successIcon } from "@/public/image";
import { DeleteSuccessType, ModalProps } from "@/src/type/types";

const DeleteSuccessModal: React.FC<DeleteSuccessType> = ({ handler }) => {
  return (
    <div className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-gray-500 bg-opacity-50">
      <div className="inline-flex flex-col p-10 text-sm sm:text-base md:text-lg lg:text-xl border-2 border-gray-box bg-white rounded-lg ">
        <div className="flex items-center justify-center font-b mb-4">
          <Image src={successIcon} alt="사진 아이콘" className="mr-4 w-8 sm:w-9 md:w-10 lg:w-11" />
          <div>
            <p>삭제가 완료 되었습니다.</p>
          </div>
        </div>
        <div className="flex justify-center items-center ">
          <Button bg="bg-blue" px="px-5" textSize="text-xs sm:text-xs md:text-sm lg:text-base" textColor="text-white" handler={handler}>
            확인
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DeleteSuccessModal;
