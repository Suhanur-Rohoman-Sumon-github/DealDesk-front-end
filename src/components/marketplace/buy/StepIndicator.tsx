import { FaCheckCircle } from "react-icons/fa";

// Replace this with your actual icons array
const icons = [FaCheckCircle, FaCheckCircle, FaCheckCircle];

const getPercentage = (currentStep: number) => {
  if (currentStep <= 0) return 0;
  if (currentStep >= 3) return 100;
  return (currentStep / 3) * 100;
};

const StepIndicator = ({ currentStep }: { currentStep: number }) => {
  const radius = 24;
  const stroke = 4;
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const progress = getPercentage(currentStep);
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="w-full fixed top-14 left-0 right-0 z-20 ">
      <div className="flex justify-between items-center w-full max-w-4xl mx-auto">
        {/* Step Indicator */}
        <div className="flex items-center flex-grow gap-0">
          {[0, 1, 2].map((stepIndex) => {
            const Icon = icons[stepIndex];
            const stepNumber = stepIndex + 1;

            return (
              <div
                key={stepNumber}
                className="relative flex items-center w-full"
              >
                {/* Step Icon */}
                <div
                  className={`h-10 w-10 rounded-full flex items-center justify-center text-lg border-2 transition-all duration-300
                    ${
                      currentStep > stepIndex
                        ? "bg-[#5b2d82] text-white border-[#5b2d82]"
                        : currentStep === stepIndex
                        ? "bg-[#9033de] text-white animate-pulse border-[#5b2d82]"
                        : "bg-white/10 text-white border-white/30"
                    }`}
                >
                  {currentStep > stepIndex ? (
                    <FaCheckCircle className="text-white" />
                  ) : (
                    <Icon />
                  )}
                </div>

                {/* Connecting Line */}
                {stepIndex < 2 && (
                  <div
                    className={`h-1 flex-grow mx-2 transition-all duration-300 ${
                      currentStep > stepIndex ? "bg-[#5b2d82]" : "bg-[#9033de]"
                    }`}
                  />
                )}
              </div>
            );
          })}
        </div>

        {/* Circular Progress Bar */}
        <div className="w-20 h-20 relative ml-4 pt-4">
          <svg height="100%" width="100%">
            <circle
              stroke="#ffffff30"
              fill="transparent"
              strokeWidth={stroke}
              r={normalizedRadius}
              cx={radius}
              cy={radius}
            />
            <circle
              stroke="#5b2d82"
              fill="transparent"
              strokeWidth={stroke}
              strokeLinecap="round"
              strokeDasharray={`${circumference} ${circumference}`}
              style={{ strokeDashoffset }}
              r={normalizedRadius}
              cx={radius}
              cy={radius}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center text-white text-[10px] right-7 font-bold">
            {Math.round(progress)}%
          </div>
        </div>
      </div>
    </div>
  );
};

export default StepIndicator;
