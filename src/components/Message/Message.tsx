import React, {FC} from "react";

interface MessageProps {
    data: string;
    isMy?: boolean;
}

const Message: FC<MessageProps> = ({
                                       data,
                                       isMy = false,
                                   }) => {
    let style: string
    let justify: string

    if (isMy) {
        justify ="justify-end"
        style = " text-white bg-violet-500 rounded-[12px_12px_0px_12px]"
    } else {
        justify ="justify-start"
        style = " bg-violet-50 rounded-[12px_12px_12px_0px]"
    }

    return (
        <div className={"max-w-xl flex mb-2 "+justify}>
            <div
                className={"max-w-xl px-[12px] py-[6px] " + style}>
                {data}
            </div>
        </div>
    )
}

export default Message