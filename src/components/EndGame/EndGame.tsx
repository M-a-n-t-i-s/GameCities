import React, {FC, useState} from 'react';
import Game from "../Game/Game";


interface EndGameProps {
    lastCity?: string,
    isYouWin?: boolean,
    countCities?: number
}


const EndGame: FC<EndGameProps> = (
    {
        lastCity,
        isYouWin=false,
        countCities = 0,
    }
) => {
    const [start, setStart] = useState<boolean>(false)
    return (
        <>
            {
                start ?
                    <Game/>
                    :
                    <div className="flex flex-col w-[576px] items-center  text-center p-10 gap-9 bg-white rounded-2xl ">

                        {isYouWin ?
                            <>
                                <div className="text-xl">
                                    <p>Поздравляем тебя с победой!</p>
                                    <p>Твой противник не вспомнил нужный город!</p>
                                </div>
                                <p className="text-3xl text-green-600 font-medium leading-10">00:00</p>
                            </>
                            :
                            <>
                                <div className="text-xl">
                                    <p>К сожалению твоё время вышло</p>
                                    <p>Твой противник победил!</p>
                                </div>
                                <p className="text-3xl  text-red-600 font-medium leading-10">00:00</p>
                            </>
                        }


                        <div className="text-xl">
                            <p>Всего было перечисленно городов: {countCities}</p>
                            <p>Очень неплохой результат!</p>
                        </div>
                        {
                            lastCity ?
                                <div>
                                    <p className="text-xl">Последний город названный победителем</p>
                                    <h1 className="leading-9 text-2xl font-medium">{lastCity}</h1>
                                </div>
                                :
                                <></>
                        }
                        <button
                            onClick={() => setStart(true)}
                            className="text-white text-base font-medium leading-6 py-2 px-4 rounded-md bg-violet-600 ">
                            Начать новую игру
                        </button>
                    </div>
            }
        </>
    );
}

export default EndGame;
