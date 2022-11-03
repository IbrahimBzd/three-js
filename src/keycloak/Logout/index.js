import * as React from 'react';
import logout from "./logout";

export default function Logout() {
    return <div>
        <button style={{
            backgroundColor: "orangered",
            borderRadius: 10,
            color: '#fff',
            padding: '10px 16px',
            cursor: "pointer"
        }}
                type="button"
                onClick={logout}
        >Logout
        </button>
    </div>
}