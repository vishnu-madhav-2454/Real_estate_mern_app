
import { useState } from "react";
import { useEffect } from "react"; 

const Contact = ({listing}) => {
    const [landlord,setLandlord] = useState(null);

    useEffect(() => {
        const fetchLandlord = async () => {
            const response = await fetch(`/api/user/${listing.userRef}`);
            const data = await response.json();
            setLandlord(data);
        }
        fetchLandlord();
    }, [listing.userRef]);
  return (
    <div>
      {
        landlord && (
            <div className="mt-6 p-4 border border-gray-300 rounded-lg bg-gray-50">
                <h2 className="text-lg font-semibold mb-2">Contact Owner</h2>
                <p className="text-gray-700"><span className="font-semibold">Name:</span> {landlord.name}</p>
                <p className="text-gray-700"><span className="font-semibold">Email:</span> {landlord.email}</p>
                {landlord.phone && (
                    <p className="text-gray-700"><span className="font-semibold">Phone:</span> {landlord.phone}</p>
                )}
            </div>
        )
      }
    </div>
  );
};

export default Contact;
