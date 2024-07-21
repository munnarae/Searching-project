const companyNumbers = [
    '일', '이', '삼', '사', '오', '육', '칠', '팔', '구', '십',
    '십일', '십이', '십삼', '십사', '십오', '십육', '십칠', '십팔', '십구', '이십'
];

export const companyData = Array.from({ length: 20 }, (_, i) => ({
    name: `${companyNumbers[i]}만원더`,
    description: '인터넷 기본 46만원+할인 156만',
    imageUrl: 'https://via.placeholder.com/50'
}));

export const suggestionsList = companyData.map(company => company.name);