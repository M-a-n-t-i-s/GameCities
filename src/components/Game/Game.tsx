import React, {useEffect, useState} from 'react';
import styles from "./Game.module.css";
import Message from "../Message/Message";
import notActiveButton from "../../images/notActiveButton.png"
import activeButton from "../../images/activeButton.png"
import {cities} from "../../db/db";
import {ucFirst} from "../../utils/utils";
import EndGame from "../EndGame/EndGame";


const Game = () => {
    const [inputValue, setInputValue] = useState<string>("");
    const [isYouQueue, setIsYouQueue] = useState<boolean>(true);
    const [isEndGame, setEndGame] = useState<boolean>(false);
    const [toggleTimeBar, setToggleTimeBar] = useState<number>(1);
    const [secondsLeft, setSecondsLeft] = useState<number>(120);
    const [listCities, setListCities] = useState<Array<[string, boolean]>>([]);
    const [placeholder, setPlaceholder] = useState<string>("Напишите любой город, например: Где вы живете?")
    const [info, setInfo] = useState<string>("")
    const scrollableContainer : HTMLElement | null = document.getElementById('scrollable-container');

    useEffect(() => {
        if (secondsLeft > 0) {
            const intervalId = setInterval(() => {
                setSecondsLeft(secondsLeft - 1);
            }, 1000);

             return () => clearInterval(intervalId);
        }
        else {
            setEndGame(true)

        }
    }, [secondsLeft]);

    const minutes = Math.floor(secondsLeft / 60);
    const seconds = secondsLeft % 60;


    const botMessage = async () => {
        let result: string
        let flag: boolean = true
        let mySet = new Set<string>()
        listCities.forEach(record => {
            mySet.add(record[0]);
        })
        while (flag) {
            if (cities.length===mySet.size) {
                flag=false
            }

            let rand = Math.floor(Math.random() * cities.length);
            result = cities[rand];
            let toggle: boolean = true
            listCities.forEach(record => {
                if (record.includes(result)) {toggle=false};
                mySet.add(record[0]);
            })
            console.log(result)
            // @ts-ignore
            console.log(toggle)

            // @ts-ignore
            if (result[0] === ucFirst(returnLetter())  && toggle ) {
                const array: Array<[string, boolean]> = listCities
                // @ts-ignore
                array.push([result, false])
                setListCities(array)
                setIsYouQueue(true)
                setSecondsLeft(120)
                setToggleTimeBar(toggleTimeBar+2)
                setPlaceholder(`Знаете город на букву "${ucFirst(returnLetter())}"?`)
                setInfo(`Всего перечислено городов: ${listCities.length}`)
                // @ts-ignore
                scrollableContainer.scrollTop = 1000;
                flag = false
            } else  {
                mySet.add(result)
            }
        }

    }

    const returnLetter =() : string=> {
        let letter :string
        // @ts-ignore
        if(listCities.at(-1)[0].at(-1) ==='ъ' || listCities.at(-1)[0].at(-1) ==='ь' || listCities.at(-1)[0].at(-1) ==='ы') {
            // @ts-ignore
             letter = listCities.at(-1)[0].at(-2)
        } else {
            // @ts-ignore
             letter=listCities.at(-1)[0].at(-1)
        }
        return letter

    }

    const handler = () => {

        // @ts-ignore
        if ((listCities.length !== 0 && ucFirst(returnLetter()) === inputValue[0]) || (listCities.length === 0)) {

            if (cities.includes(inputValue)) {
                let flag: boolean = false
                listCities.forEach(ar => {
                    if (inputValue === ar[0]) {
                        flag = true
                    }
                })

                if (flag) {
                    setInfo("Этот город уже был")
                } else {
                    const array: Array<[string, boolean]> = listCities
                    array.push([inputValue, true])
                    setListCities(array)
                    setIsYouQueue(false)
                    setSecondsLeft(120)
                    setToggleTimeBar(toggleTimeBar+1)
                    setPlaceholder("Ожидаем ответа соперника...")
                    // @ts-ignore
                    scrollableContainer.scrollTop = 1000;
                    setInfo(`Всего перечислено городов: ${listCities.length}`)
                    setTimeout(botMessage, 3000)
                }
            } else {
                setInfo("Такого города нет в списке")
            }
        } else {
            setInfo("Введите другой город который заканчивается на нужную букву")
        }
        setInputValue("")
    }

    return (
        <>
            { isEndGame ?
                <>
                    { listCities.length===0 ?
                        <EndGame />
                        :
                        <EndGame lastCity={listCities!.at(-1)![0] } isYouWin={listCities!.at(-1)![1]} countCities={listCities.length}/>
                }
                </>
                :
                <div  className="flex flex-col max-w-xl items-center  bg-white rounded-2xl ">
                    <header className="h-[64px] ">
                        <div className="flex w-[576px] items-center justify-between px-[16px] py-[17px] ">
                            <div className="text-black text-base ">
                                {isYouQueue ? "Сейчас ваша очередь" : "Сейчас очередь соперника"}
                            </div>
                            <div className="text-xl">
                                {minutes}:{seconds}
                            </div>

                        </div>
                        <div className={styles.timeBar} key={toggleTimeBar}></div>
                    </header>
                    <div  id="scrollable-container" className={"flex-col w-[576px] py-5 px-4 gap-x-2 h-[320px] overflow-auto  " + styles.panel}>
                        {listCities.length===0 ?
                            <div className=" relative w-[528px] h-[21px] top-[149px]   text-gray-400  text-center ">
                                Первый участник вспоминает города...
                            </div>
                            : <>{listCities.map(city => <Message key={city[0]} data={city[0]} isMy={city[1]}/>)}</>}
                    </div>
                    <div className="flex justify-between h-[21px] text-gray-700">{info}</div>
                    <footer  className="relative self-stretch w-full h-[80px] bg-transparent rounded-[0px_0px_16px_16px]">
                        <div className="relative w-[544px] h-[48px] top-[16px] left-[16px]">
                            <div className="h-[48px] bg-gray-50  rounded-[6px] overflow-hidden ">
                                <div className="relative w-[477px] h-[19px] top-[14px] left-[12px]  text-grey-700">
                                    <input
                                        placeholder={placeholder}
                                        className={styles.input} value={inputValue}
                                        onKeyUp={event => {if (event.key==='Enter') {
                                            handler()
                                        }}}
                                        onChange={e => setInputValue(ucFirst(e.target.value))} disabled={!isYouQueue}>
                                    </input>
                                </div>
                            </div>
                            {inputValue && isYouQueue ?
                                <img
                                    className={"absolute w-[38px] h-[38px] top-[6px] left-[501px] " + styles.button}
                                    alt="Button"
                                    src={activeButton}
                                    onClick={handler}
                                />
                                :
                                <img
                                    className="absolute w-[38px] h-[38px] top-[6px] left-[501px]"
                                    alt="Button"
                                    src={notActiveButton}
                                />
                            }
                        </div>
                    </footer>
                </div>
            }
            </>
    );
}

export default Game;


