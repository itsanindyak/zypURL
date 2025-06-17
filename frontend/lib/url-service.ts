 import { ShortenedUrlType } from '@/hooks/use-url-history';
import axios from 'axios';



export async function shortenUrl(url: string ): Promise<ShortenedUrlType> {
    const envurl = process.env.NEXT_PUBLIC_URL;
    const apiurl = `${envurl}/api/v1/url/c`
    const urlobj = {redirectURL: url}
    try {
        const response = await axios.post(apiurl,urlobj, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const res:ShortenedUrlType ={
            id: response.data.data._id,
            shortUrl: response.data.data.shortID,
            originalUrl: response.data.data.redirectURL,
            createdAt: Date.now().toString()
        } 

        return res
    } catch (error) {
        console.error('Error posting data:', error);
        throw error;
    }
}
