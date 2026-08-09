import { previewStates } from "../customer.constants";
import type { State } from "../customer.types";

type CustomerStateProps = {
  state: State;
  setState: (state: State) => void;
};

const CustomerState = ({
  state: selectedState,
  setState,
}: CustomerStateProps) => {
  return (
    <div className="flex flex-wrap items-center gap-2 border-t border-border px-4 py-3 sm:px-5">
      <p className="mr-1 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
        Assessment state preview
      </p>
      {previewStates.map((state) => (
        <button
          type="button"
          key={state}
          onClick={() => setState(state)}
          aria-pressed={selectedState === state}
          className={`rounded-full px-3 py-1 text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-card ${
            selectedState === state
              ? "bg-primary text-primary-foreground"
              : "bg-muted text-muted-foreground hover:text-foreground"
          }`}
        >
          {state.charAt(0).toUpperCase() + state.slice(1)}
        </button>
      ))}
    </div>
  );
};

export default CustomerState;
