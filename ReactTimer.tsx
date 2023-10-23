import {memo, useEffect, useMemo, useState} from "react";
import {Timer} from "./instance";

// function isPromise(obj: unknown) {
//     return obj instanceof Promise;
// }


type TProps = { onAction: () => void | Promise<unknown> }
export default memo(({onAction}: TProps) => {

    const [state, setState] = useState<null | number>(null)

    const instanceTimer = useMemo(() => new Timer(setState), [])

    useEffect(() => {
        return () => instanceTimer.clear()
    }, []);

    const onSendCode = async () => {
        await onAction();
        instanceTimer.run();
    }

    return <div>
        {state === null
            ? <a className={"text-gray-400 underline hover:text-blue-400"} onClick={onSendCode}>Resend one-time code
                again</a>
            : <span className="text-gray-400">You can use the code for: {state} seconds</span>}
    </div>
})
