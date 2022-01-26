import React from "react";
import { render, within, fireEvent, waitFor } from "@testing-library/react";
import App from "./App";

describe("App Container", () => {
    it("should render input field", async () => {
        const { container } = render(<App />);
        await waitFor(
            () => {
                expect(
                    container.querySelector('[class="country"]'),
                ).toBeInTheDocument();
            },
            { timeout: 10000 },
        );

        expect(container.querySelectorAll('[class="country"]')).toHaveLength(
            250,
        );

        let wrapper: any = container.querySelector("input[type='text']");
        expect(wrapper).toBeDefined();
        expect(within(wrapper).queryByDisplayValue("")).toBeNull();

        fireEvent.change(wrapper, {
            target: { value: "Papua New Guinea" },
        });
        expect(container.querySelectorAll('[class="country"]')).toHaveLength(1);

        fireEvent.change(wrapper, {
            target: { value: "" },
        });
        expect(container.querySelectorAll('[class="country"]')).toHaveLength(
            250,
        );

        fireEvent.change(wrapper, {
            target: { value: "Papua New Guinea" },
        });
        expect(container.querySelectorAll('[class="country"]')).toHaveLength(1);
        expect(
            within(wrapper).queryByDisplayValue("Papua New Guinea"),
        ).toBeDefined();

        const btnWrapper: any = container.querySelector("button");
        expect(btnWrapper).toBeDefined();
        fireEvent.click(btnWrapper);
        expect(within(wrapper).queryByDisplayValue("")).toBeNull();
    });
});
