import React, {useState} from 'react';
import Game from "../Game/Game";


const StartGame = () => {
    const [start, setStart] = useState<boolean>(false)
    return (
        <>
            {
                start ?
                    <Game/>
                    :
                    <div className="flex flex-col max-w-xl items-center bg-white rounded-2xl ">
                        <div>
                            <div className="flex justify-around p-4">
                                <h1 className="text-black text-base leading-6">
                                    Игра в города на время
                                </h1>
                            </div>
                            <img
                                className=" w-[576px] h-[3px] top-[61px] left-0"
                                alt="Border"
                                src="https://c.animaapp.com/k6UnMpkt/img/border.svg"
                            />
                        </div>

                        <div className="flex flex-col text-gray-700 font-normal  items-center gap-6 p-6 text-sm">
                            <p className="self-stretch  ">
                                Цель: Назвать как можно больше реальных городов.
                            </p>
                            <ul className="pl-5 list-disc self-stretch   ">
                                <li>Запрещается повторение городов.</li>
                                <li>Названий городов на "ы", твердый “ъ” и мягкий “ъ” знак нет. Из-за этого бы пропускаем эту
                                    букву и игрок должен
                                    назвать город на букву стоящую перед ъ или ь знаком.
                                </li>
                                <li>Каждому игроку дается 2 минуты на размышления, если спустя это время игрок не вводит
                                    слово он считается
                                    проигравшим
                                </li>
                            </ul>
                            <button
                                className="text-white text-base  leading-6 flex py-2 px-4 rounded-md bg-violet-600 font-medium"
                                onClick={() => setStart(true)}>
                                Начать игру
                            </button>
                        </div>
                    </div>
            }
        </>
    );
}

export default StartGame;
