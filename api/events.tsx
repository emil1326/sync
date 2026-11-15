import { convertLocalToUTC, convertUTCToLocal } from "@/functions/convertirUTCenLocal"
import formaterDatePourServeur from "@/functions/formaterDatePourServeur"
import { Event } from "@/types/calendar"
import type { AxiosInstance } from "axios"
import { DateTime } from "luxon"

const urlDetails = (id: string) => `/evenements/${id}`

const convertirDetails = (data: Event): Event => ({
    ...data,
    debut: data.debut ? convertUTCToLocal(data.debut, "local") : data.debut,
    fin: data.fin ? convertUTCToLocal(data.fin, "local") : data.fin,
})

const events = {
    getDetails: {
        url: urlDetails,
        get: async (api: AxiosInstance, id: string): Promise<Event> => {
            const { data } = await api.get<Event>(urlDetails(id))
            return data
        },
        params: ({start, end} : {start: string, end: string}) => ({
            debut: formaterDatePourServeur(convertLocalToUTC(start ?? DateTime.now())),
            fin: formaterDatePourServeur(convertLocalToUTC(end ?? DateTime.now().plus({ hour: 1 }))),
        }),
        onData: convertirDetails,
    },
    
}

export default events;