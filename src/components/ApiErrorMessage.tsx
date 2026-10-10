const ApiErrorMessage = ({ message }: { message: string }) => (
    <div
        role="alert"
        className="rounded-lg border border-amber-300 bg-amber-50 px-4 py-3 text-amber-900"
    >
        দুঃখিত, {message}
    </div>
);

export default ApiErrorMessage;
