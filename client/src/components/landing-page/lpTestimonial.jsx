import React from "react";

const LpTestimonial = () => {
  const testimonials = [
    {
      id: 1,
      name: "John Doe",
      rating: 5,
      comment:
        "Amazing experience! The food was delicious, the staff was friendly, and the ambiance was perfect. Will definitely be coming back!",
    },
    {
      id: 2,
      name: "Jane Smith",
      rating: 4,
      comment:
        "Great variety on the menu! Tried the chef’s special and it exceeded my expectations. The presentation was superb.",
    },
    {
      id: 3,
      name: "Sam Johnson",
      rating: 5,
      comment:
        "Fantastic service! The waitstaff was attentive and knowledgeable about the menu. A wonderful dining experience.",
    },
  ];

  return (
    <div className="sm:h-[70vh] h-[90vh] flex justify-center items-center">
      <div className="container mx-auto px-5">
        <div className="flex flex-col items-center">
          <div className="text-5xl font-bold text-light-primary mb-6">
            Customer Reviews
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="bg-white p-6 rounded-lg shadow-md"
              >
                <div className="text-2xl font-semibold">{testimonial.name}</div>
                <div className="flex items-center mb-2">
                  {Array.from({ length: testimonial.rating }).map(
                    (_, index) => (
                      <svg
                        key={index}
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-light-secondary fill-current"
                        viewBox="0 0 20 20"
                      >
                        <path d="M10 1l2.4 5.7 5.6.5-4 3.8.9 5.7-4.9-2.6-4.9 2.6.9-5.7-4-3.8 5.6-.5L10 1z" />
                      </svg>
                    )
                  )}
                </div>
                <p className="text-gray-700">{testimonial.comment}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LpTestimonial;
