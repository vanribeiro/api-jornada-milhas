import IPerson from "./interfaces/person.js"
import ITestimonial from "./interfaces/testimonial.js"

const person: IPerson = {
    id: '1',
    name: 'Marcia',
    image: 'folder/image.png'
}

const testimonial: ITestimonial = {
    id: '1',
    person_id: person.id,
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque tristique placerat metus, et iaculis lectus aliquam non. Etiam dapibus justo arcu. Sed nec ultrices turpis. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Integer ex purus, dapibus in neque at, ultricies tincidunt diam. Nunc non lobortis nibh. Cras sodales accumsan elit sed condimentum. '
}


const people: IPerson[] = [
    {
        id: '1',
        name: 'Marcia',
        image: 'folder/image1.png'
    },
    {
        id: '2',
        name: 'Felipe',
        image: 'folder/image2.png'
    },
    {
        id: '3',
        name: 'Vivian',
        image: 'folder/image3.png'
    }
];

const testimonials: ITestimonial[] = [
    {
        id: '101',
        person_id: people[0].id,
        text: 'Etiam dapibus justo arcu. Sed nec ultrices turpis. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Integer ex purus, dapibus in neque at, ultricies tincidunt diam. Nunc non lobortis nibh. Cras sodales accumsan elit sed condimentum. '
    },
    {
        id: '102',
        person_id: people[1].id,
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque tristique placerat metus, et iaculis lectus aliquam non.'
    },
    {
        id: '103',
        person_id: people[2].id,
        text: 'Cras sodales accumsan elit sed condimentum.'
    }
]


export {
    testimonial as mockTestimonial,
    people as mockPeople,
    testimonials as mockTestimonials
}