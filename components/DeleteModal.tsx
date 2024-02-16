import Image from "next/image";
import { Button } from ".";
import { importantIcon } from "@/public/image";
import { ModalProps } from "@/src/type/types";

const DeleteModal: React.FC<ModalProps> = ({ checkHandler, deleteHandler }) => {
  return (
    <div className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-gray-500 bg-opacity-50" onClick={checkHandler}>
      <div className="inline-flex flex-col p-10 text-sm sm:text-base md:text-lg lg:text-xl border-2 border-gray-box bg-white rounded-lg ">
        <div className="flex items-center justify-center font-b mb-4">
          <Image src={importantIcon} alt="사진 아이콘" className="mr-4 w-8 sm:w-9 md:w-10 lg:w-11" />
          <div>
            <div className="flex flex-col">
              <div className="-mb-1">
                삭제 시 <span className="text-red">복구할 수 없습니다.</span>
              </div>
              <p>정말로 삭제하시겠습니까?</p>
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center ">
          <Button bg="border-2 border-gray-box" px="px-5" textSize="text-xs sm:text-xs md:text-sm lg:text-base" textColor="text-black" handler={checkHandler}>
            돌아가기
          </Button>
          <span className="ml-4 ">
            <Button bg="bg-red" px="px-5" textSize="text-xs sm:text-xs md:text-sm lg:text-base" textColor="text-white" handler={deleteHandler}>
              삭제하기
            </Button>
          </span>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
