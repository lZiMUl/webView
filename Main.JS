class View {
    constructor (ViewName) {
        if (ViewName && View.ViewExeit (ViewName)) {
            return fetch (`./Publics/Views/${ViewName}.HTML`);
        }
    }

    static ViewExist (ViewName) {
        try {
            if (fetch (ViewName))
            return true;
            else
            return false;
        } catch (Err) {
            const Errs = new Error (Err);
            console.error (Errs);
            alert (Errs);
        }
    }
};

export default View;