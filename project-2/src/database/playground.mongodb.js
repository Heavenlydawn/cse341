use("movies_locations");

db.cinemas.insertMany([
    {
        name: "Filmhouse Cinemas",
        location: "Lekki, Lagos",
        address:
            "The Rock Drive, off Bisola Durosinmi Etti Drive, Lekki Phase 1, Lagos",
    },
    {
        name: "Silverbird Cinemas",
        location: "Victoria Island, Lagos",
        address: "133 Ahmadu Bello Way, Victoria Island, Lagos",
    },
    {
        name: "Genesis Cinemas",
        location: "Central Business District, Abuja",
        address:
            "Ceddi Plaza, 264 Tafawa Balewa Way, Central Business District, Abuja",
    },
    {
        name: "Viva Cinemas",
        location: "Port Harcourt, Rivers",
        address:
            "Port Harcourt Mall, 1 Nnamdi Azikiwe Road, Port Harcourt, Rivers State",
    },
    {
        name: "Ozone Cinemas",
        location: "Yaba, Lagos",
        address: "E-Centre, 1-11 Commercial Avenue, Yaba, Lagos",
    },
]);

db.movies.insertMany([
    {
        name: "Inception",
        description:
            "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
        year: 2010,
        rating: 8.8,
        genre: ["Action", "Sci-Fi", "Thriller"],
        cast: [
            "Leonardo DiCaprio",
            "Joseph Gordon-Levitt",
            "Elliot Page",
            "Tom Hardy",
        ],
        directors: ["Christopher Nolan"],
    },
    {
        name: "The Godfather",
        description:
            "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.",
        year: 1972,
        rating: 9.2,
        genre: ["Crime", "Drama"],
        cast: ["Marlon Brando", "Al Pacino", "James Caan", "Diane Keaton"],
        directors: ["Francis Ford Coppola"],
    },
    {
        name: "Living in Bondage: Breaking Free",
        description:
            "A sequel to the 1992 classic, this film follows Nnamdi, an ambitious young man whose quest for the good life takes him down a questionable path.",
        year: 2019,
        rating: 6.5,
        genre: ["Drama", "Thriller", "Supernatural"],
        cast: ["Swanky JKA", "Ramsey Nouah", "Enyinna Nwigwe", "Munachi Abii"],
        directors: ["Ramsey Nouah"],
    },
    {
        name: "Dune: Part Two",
        description:
            "Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family.",
        year: 2024,
        rating: 8.7,
        genre: ["Action", "Adventure", "Sci-Fi"],
        cast: [
            "Timothée Chalamet",
            "Zendaya",
            "Rebecca Ferguson",
            "Austin Butler",
        ],
        directors: ["Denis Villeneuve"],
    },
    {
        name: "The Lion King",
        description:
            "Lion prince Simba and his father are targeted by his bitter uncle, who wants to ascend the throne himself.",
        year: 1994,
        rating: 8.5,
        genre: ["Animation", "Adventure", "Drama"],
        cast: [
            "Matthew Broderick",
            "Jeremy Irons",
            "James Earl Jones",
            "Whoopi Goldberg",
        ],
        directors: ["Roger Allers", "Rob Minkoff"],
    },
]);
