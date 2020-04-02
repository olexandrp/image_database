import imagesJSON from './images';

const calcDataAmount = (data) => {
  let amount = 0;
  data.forEach((entry) => {
    amount += entry.file_size
  })
  return amount;
};

const data = [
  {
    url: '/files',
    label: 'Files',
    data: []
  },
  {
    url: '/photos',
    label: 'Photos',
    data_amount: calcDataAmount(imagesJSON),
    data: imagesJSON
  },
  {
    url: '/sharing',
    label: 'Sharing',
    data: []
  },
  {
    url: '/links',
    label: 'Links',
    data: []
  },
  {
    url: '/events',
    label: 'Events',
    data: []
  },
  {
    url: '/get_started',
    label: 'Get Started',
    data: []
  }
];

export default data;