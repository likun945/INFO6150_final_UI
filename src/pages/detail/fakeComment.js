const data=[{
    "_id": {
        "$oid": "65679d494498afb01157e311"
    },
    "review_id": "1",
    "attraction_id": "1",
    "reviewer_name": "John Doe",
    "reviewer_email": "johndoe123@gmail.com",
    "reviewer_id": "1",
    "review_title": "Great place",
    "review_time": "2018-01-01 00:00:00",
    "star_rating": "5",
    "avatar": "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200",
    "detailed_review": "I visited the Statue of Liberty with my family, and it was an incredible experience. The ferry ride to Liberty Island was enjoyable, and the views of the New York City skyline were breathtaking. Exploring the museum inside the pedestal provided valuable insights into the statue's history. Climbing to the crown was a bit strenuous, but the panoramic views from up there were worth it. It's a must-visit attraction for anyone in New York."
},
    {
        "_id": {
            "$oid": "65679d494498afb01157e312"
        },
        "review_id": "2",
        "attraction_id": "1",
        "reviewer_name": "Alice Smith",
        "reviewer_email": "alicegood@outlook.com",
        "reviewer_id": "2",
        "review_title": "Wonderful Experience",
        "review_time": "2020-05-15 14:30:00",
        "star_rating": "4",
        "avatar": "https://www.gravatar.com/avatar/5e5ef472d080ae583e6e3b2ff47e2379?s=200",
        "detailed_review": "I had a fantastic time exploring the Grand Canyon. The vastness of the canyon is awe-inspiring, and the colors at sunset are simply breathtaking. I highly recommend taking a helicopter tour for a unique perspective. The ranger-led hikes were informative and added to the experience. It's a natural wonder that everyone should witness at least once."
    },
    {
        "_id": {
            "$oid": "65679d494498afb01157e313"
        },
        "review_id": "3",
        "attraction_id": "1",
        "reviewer_name": "Ella Johnson",
        "reviewer_email": "ellaj@email.com",
        "reviewer_id": "3",
        "review_title": "Art Lover's Paradise",
        "review_time": "2021-07-20 09:15:00",
        "star_rating": "5",
        "avatar": "https://plus.unsplash.com/premium_photo-1694618623840-e72540d60389?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=200&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTY5ODE5NDc0MA&ixlib=rb-4.0.3&q=80&w=200",
        "detailed_review": "I recently visited the Louvre Museum in Paris, and it was a dream come true. The collection of art is unparalleled, and seeing the Mona Lisa in person was a highlight. The architecture of the museum itself is a work of art. It's a place where you can get lost in time, surrounded by the beauty of human creativity."
    }]

const getFakeComment=()=>{
    return data;
}
export default getFakeComment;