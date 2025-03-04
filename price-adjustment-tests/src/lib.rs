pub fn round_cents(amount: f64) -> f64 {
    (amount * 100_f64).round() / 100_f64
}

#[derive(Debug)]
pub struct FeeParameters {
    pub percent_tax: f64,
    pub fixed_tax: f64,
    pub percent_pf: f64,
    pub fixed_pf: f64,
}

#[derive(Debug)]
#[allow(dead_code)]
pub struct CalculateRevenueDiagnostics {
    total_tax: f64,
    amount_submitted: f64,
    total_pf: f64,
}

pub fn calculate_revenue(
    listed_price: f64,
    params: &FeeParameters,
) -> (f64, CalculateRevenueDiagnostics) {
    let total_tax = round_cents(listed_price * params.percent_tax + params.fixed_tax);
    let amount_submitted = round_cents(listed_price + total_tax);
    let total_pf = round_cents(amount_submitted * params.percent_pf + params.fixed_pf);

    (
        amount_submitted - total_tax - total_pf,
        CalculateRevenueDiagnostics {
            total_tax,
            amount_submitted,
            total_pf,
        },
    )
}

pub fn calculate_listed_price(desired_revenue: f64, params: &FeeParameters) -> f64 {
    (desired_revenue + params.fixed_pf + params.fixed_tax * params.percent_pf)
        / (1_f64 - params.percent_pf - params.percent_pf * params.percent_tax)
}

#[cfg(test)]
mod tests {
    use rand::Rng;
    use std::ops::Range;

    use crate::{calculate_listed_price, calculate_revenue, round_cents, FeeParameters};

    #[test]
    fn test_inverse_functions() {
        const ITERATIONS: usize = 10000000;
        const PERCENT_TAX_RANGE: Range<f64> = 0.01_f64..0.25_f64;
        const PERCENT_PF_RANGE: Range<f64> = 0.01_f64..0.25f64;
        const REVENUE_RANGE: Range<f64> = 10000000000_f64..100000000000_f64;

        let mut rng = rand::rng();

        for _ in 0..ITERATIONS {
            let params = FeeParameters {
                percent_tax: round_cents(rng.random_range(PERCENT_TAX_RANGE)),
                fixed_tax: 0.07_f64,
                percent_pf: round_cents(rng.random_range(PERCENT_PF_RANGE)),
                fixed_pf: 0.09_f64,
            };
            let desired_revenue = round_cents(rng.random_range(REVENUE_RANGE));
            let listed_price = round_cents(calculate_listed_price(desired_revenue, &params));
            let (calculated_revenue, calculate_revenue_diagnostics) =
                calculate_revenue(listed_price, &params);

            assert_eq!(
                desired_revenue, round_cents(calculated_revenue),
                "\ndesired_revenue: {desired_revenue:?}\nlisted_price: {listed_price:?}\ncalculated_revenue: {calculated_revenue:?}\n{params:?}, {calculate_revenue_diagnostics:?}",
            );
        }
    }
}
