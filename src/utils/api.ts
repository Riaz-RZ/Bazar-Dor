export type ApiResult<T> =
    | { data: T; error: null }
    | { data: null; error: string };

export async function fetchApiJson<T>(
    url: string,
    resource: string,
): Promise<ApiResult<T>> {
    let response: Response;

    try {
        response = await fetch(url, { next: { revalidate: 300 } });
    } catch (error) {
        console.error(`Failed to fetch ${resource}:`, error);
        return {
            data: null,
            error: `${resource} সার্ভারের সাথে সংযোগ করা যাচ্ছে না।`,
        };
    }

    if (!response.ok) {
        console.error(`Failed to fetch ${resource}: HTTP ${response.status}`);
        return {
            data: null,
            error:
                response.status === 429
                    ? `${resource} সার্ভারে অনেক অনুরোধ গেছে (HTTP 429)। কিছুক্ষণ পরে আবার চেষ্টা করুন।`
                    : `${resource} লোড করা যায়নি (HTTP ${response.status})।`,
        };
    }

    if (!response.headers.get("content-type")?.includes("application/json")) {
        console.error(`Failed to fetch ${resource}: expected a JSON response.`);
        return {
            data: null,
            error: `${resource} সার্ভার থেকে ভুল ধরনের response এসেছে।`,
        };
    }

    try {
        const data: T = await response.json();
        return { data, error: null };
    } catch (error) {
        console.error(`Failed to parse ${resource} response as JSON:`, error);
        return {
            data: null,
            error: `${resource} সার্ভারের response পড়া যায়নি।`,
        };
    }
}
