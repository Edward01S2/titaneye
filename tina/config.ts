import { defineConfig } from 'tinacms'

// Your hosting provider likely exposes this as an environment variable
const branch = process.env.HEAD || process.env.VERCEL_GIT_COMMIT_REF || 'main'

export default defineConfig({
  branch,
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
  token: process.env.TINA_TOKEN,
  build: {
    outputFolder: 'admin',
    publicFolder: 'public',
  },
  media: {
    tina: {
      mediaRoot: 'img',
      publicFolder: 'public',
    },
  },
  schema: {
    collections: [
      {
        name: 'home',
        label: 'Home Page',
        path: 'content/home',
        format: 'md',
        ui: {
          allowedActions: {
            create: false,
            delete: false,
          },
        },
        fields: [
          {
            type: 'string',
            name: 'title',
            label: 'Title',
            isTitle: true,
            required: true,
          },
          {
            type: 'object',
            name: 'hero',
            label: 'Hero Section',
            fields: [
              {
                type: 'string',
                name: 'title',
                label: 'Title',
              },
              {
                type: 'string',
                name: 'description',
                label: 'Description',
                ui: {
                  component: 'textarea',
                },
              },
              {
                type: 'image',
                name: 'image',
                label: 'Image',
              },
            ],
          },
          {
            type: 'object',
            name: 'services',
            label: 'Services',
            fields: [
              {
                type: 'image',
                name: 'image',
                label: 'Icon',
              },
              {
                type: 'string',
                name: 'item1',
                label: 'Service 1 Title',
              },
              {
                type: 'string',
                name: 'text1',
                label: 'Service 1 Description',
                ui: {
                  component: 'textarea',
                },
              },
              {
                type: 'string',
                name: 'item2',
                label: 'Service 2 Title',
              },
              {
                type: 'string',
                name: 'text2',
                label: 'Service 2 Description',
                ui: {
                  component: 'textarea',
                },
              },
              {
                type: 'string',
                name: 'item3',
                label: 'Service 3 Title',
              },
              {
                type: 'string',
                name: 'text3',
                label: 'Service 3 Description',
                ui: {
                  component: 'textarea',
                },
              },
            ],
          },
          {
            type: 'object',
            name: 'appointment',
            label: 'Appointment Section',
            fields: [
              {
                type: 'image',
                name: 'image',
                label: 'Icon',
              },
              {
                type: 'string',
                name: 'patient',
                label: 'Patient Form Link',
              },
            ],
          },
          {
            type: 'object',
            name: 'insurance',
            label: 'Insurance',
            fields: [
              {
                type: 'image',
                name: 'images',
                label: 'Insurance Logos',
                list: true,
              },
            ],
          },
          {
            type: 'image',
            name: 'image2',
            label: 'Bottom Image',
          },
        ],
      },
      {
        name: 'pages',
        label: 'Pages',
        path: 'content/pages',
        format: 'md',
        fields: [
          {
            type: 'string',
            name: 'title',
            label: 'Page Title',
            isTitle: true,
            required: true,
          },
          {
            type: 'rich-text',
            name: 'body',
            label: 'Content',
            isBody: true,
          },
        ],
      },
      {
        name: 'staff',
        label: 'Staff',
        path: 'content/staff',
        format: 'md',
        fields: [
          {
            type: 'string',
            name: 'title',
            label: 'Page Title',
            isTitle: true,
            required: true,
          },
          {
            type: 'object',
            name: 'doctors',
            label: 'Doctors',
            list: true,
            fields: [
              {
                type: 'string',
                name: 'name',
                label: 'Name',
                required: true,
              },
              {
                type: 'string',
                name: 'title',
                label: 'Title',
              },
              {
                type: 'image',
                name: 'image',
                label: 'Photo',
              },
              {
                type: 'string',
                name: 'bio',
                label: 'Biography',
                ui: {
                  component: 'textarea',
                },
              },
            ],
          },
          {
            type: 'object',
            name: 'staff',
            label: 'Staff Members',
            list: true,
            fields: [
              {
                type: 'string',
                name: 'name',
                label: 'Name',
                required: true,
              },
              {
                type: 'string',
                name: 'title',
                label: 'Title',
              },
              {
                type: 'image',
                name: 'image',
                label: 'Photo',
              },
            ],
          },
        ],
      },
      {
        name: 'settings',
        label: 'Site Settings',
        path: 'content/settings',
        format: 'md',
        fields: [
          {
            type: 'string',
            name: 'title',
            label: 'Title',
            isTitle: true,
            required: true,
          },
          {
            type: 'object',
            name: 'settings',
            label: 'Settings',
            fields: [
              {
                type: 'string',
                name: 'phone',
                label: 'Phone',
              },
              {
                type: 'string',
                name: 'fax',
                label: 'Fax',
              },
              {
                type: 'string',
                name: 'email',
                label: 'Email',
              },
              {
                type: 'string',
                name: 'address',
                label: 'Address',
                ui: {
                  component: 'textarea',
                },
              },
              {
                type: 'string',
                name: 'bookingUrl',
                label: 'Booking URL',
              },
              {
                type: 'string',
                name: 'monday',
                label: 'Monday Hours',
              },
              {
                type: 'string',
                name: 'tuesday',
                label: 'Tuesday Hours',
              },
              {
                type: 'string',
                name: 'wednesday',
                label: 'Wednesday Hours',
              },
              {
                type: 'string',
                name: 'thursday',
                label: 'Thursday Hours',
              },
              {
                type: 'string',
                name: 'friday',
                label: 'Friday Hours',
              },
              {
                type: 'string',
                name: 'saturday',
                label: 'Saturday Hours',
              },
              {
                type: 'string',
                name: 'sunday',
                label: 'Sunday Hours',
              },
            ],
          },
        ],
      },
    ],
  },
})

