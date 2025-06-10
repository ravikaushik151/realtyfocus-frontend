import dayjs from 'dayjs';

export const formatDate = (dateString) => {
    return dayjs(dateString).isValid() ? dayjs(dateString).format('MMM YYYY') : null;
};