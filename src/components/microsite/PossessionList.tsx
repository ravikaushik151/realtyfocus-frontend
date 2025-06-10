// PossessionList.tsx
import { formatDate } from '@/lib/dateUtils';
import { faKey } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// PossessionList.tsx

export default function PossessionList({ project }) {
    let parsedPossessionData = [];

    try {
        const possessionRaw = project?.possession;

        if (!possessionRaw) {
            parsedPossessionData = [];
        } else if (Array.isArray(possessionRaw)) {
            // Already an array
            parsedPossessionData = possessionRaw;
        } else if (typeof possessionRaw === 'string') {
            // Try to detect if it's a JSON string
            if (possessionRaw.trim().startsWith('{') || possessionRaw.trim().startsWith('[')) {
                // Looks like JSON
                try {
                    const parsed = JSON.parse(possessionRaw);
                    parsedPossessionData = Array.isArray(parsed) ? parsed : [parsed];
                } catch (e) {
                    // Not valid JSON, but also not a date? Show error
                    console.warn("Failed to parse JSON string:", possessionRaw);
                    parsedPossessionData = [{ possession: possessionRaw, details: "Invalid data" }];
                }
            } else {
                // Assume it's a date string
                parsedPossessionData = [{ possession: possessionRaw }];
            }
        } else if (typeof possessionRaw === 'object' && possessionRaw !== null) {
            // Directly an object
            parsedPossessionData = [possessionRaw];
        } else {
            parsedPossessionData = [];
        }
    } catch (error) {
        console.error("Unexpected error in parsing possession data", error);
        parsedPossessionData = [];
    }

    return (
        <ul style={{ paddingLeft: 0 }}>
            {/* Label Only Once */}
            <li className="item">
                <div className="box-icon w-52">
                    <FontAwesomeIcon icon={faKey} />
                </div>
                <div className="content">
                    <span className="label">Possession:</span>
                </div>
            </li>

            {/* List of Dates with Details */}
            {parsedPossessionData.length > 0 ? (
                parsedPossessionData.map((item, index) => {
                    const possessionDate = formatDate(item.possession || item.date || item);
                    const details = item.details || '';
                    return (
                        <li key={index} className="item mb-3 possessiondate">
                            <div className="content">
                                <span>
                                    {possessionDate
                                        ? (details && details !== "Invalid data"
                                            ? `${possessionDate} (${details})`
                                            : possessionDate)
                                        : 'Invalid Date'}
                                </span>
                            </div>
                        </li>
                    );
                })
            ) : (
                <li className="item">
                    <div className="content">
                        <span>Not Available</span>
                    </div>
                </li>
            )}
        </ul>
    );
}