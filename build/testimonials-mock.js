const user = {
    id: '1',
    name: 'Marcia',
    image: 'folder/image.png'
};
const testimonial = {
    id: '1',
    person_id: user.id,
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque tristique placerat metus, et iaculis lectus aliquam non. Etiam dapibus justo arcu. Sed nec ultrices turpis. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Integer ex purus, dapibus in neque at, ultricies tincidunt diam. Nunc non lobortis nibh. Cras sodales accumsan elit sed condimentum. '
};
const users = [
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
const testimonials = [
    {
        id: '101',
        person_id: users[0].id,
        text: 'Etiam dapibus justo arcu. Sed nec ultrices turpis. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Integer ex purus, dapibus in neque at, ultricies tincidunt diam. Nunc non lobortis nibh. Cras sodales accumsan elit sed condimentum. '
    },
    {
        id: '102',
        person_id: users[1].id,
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque tristique placerat metus, et iaculis lectus aliquam non.'
    },
    {
        id: '103',
        person_id: users[2].id,
        text: 'Cras sodales accumsan elit sed condimentum.'
    }
];
export { testimonial as mockTestimonial, user as mockUser, testimonials as mockTestimonials };
