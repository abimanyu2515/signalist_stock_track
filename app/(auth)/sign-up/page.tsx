'use client'

import CountryField from "@/components/forms/CountryField";
import FooterLink from "@/components/forms/FooterLink";
import InputField from "@/components/forms/InputField";
import SelectField from "@/components/forms/SelectField";
import { Button } from "@/components/ui/button";
import { INVESTMENT_GOALS, PREFERRED_INDUSTRIES, RISK_TOLERANCE_OPTIONS } from "@/lib/constants";
import { SubmitHandler, useForm } from "react-hook-form";

const SignUp = () => {
    const { 
        handleSubmit, 
        register, 
        control, 
        formState: { errors, isSubmitting },
    } = useForm<SignUpFormData>({
        defaultValues: {
            fullName: '',
            email: '',
            password: '',
            country: 'IN',
            investmentGoals: 'Growth',
            riskTolerance: 'Medium',
            preferredIndustry: 'Technology',
        }, mode: 'onBlur',
    });
    
    const onSubmit: SubmitHandler<SignUpFormData> = async (data: SignUpFormData) => {
        try {
            console.log(data);
        } catch (e) {
            console.error(e);
        }
    } 

  return (
    <>
        <h1 className="form-title">Sign Up & Personalize.</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <InputField
                name="fullName"
                label="Full Name"
                register={register}
                error={errors.fullName}
                placeholder="John Doe"
                validation={{ required: "Full Name is required", minLength: 2 }}
            />

            <InputField
                name="email"
                label="Email Address"
                register={register}
                error={errors.email}
                placeholder="some@example.com"
                validation={{ required: "Email is required", pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Invalid email address" } }}
            />

            <InputField
                name="password"
                label="Password"
                register={register}
                type="password"
                error={errors.password}
                placeholder="Enter your password"
                validation={{ required: "Password is required", minLength: 8 }}
            />

            <CountryField
                name="country"
                label="Country"
                control={control}
                error={errors.country}
                required
            />

            <SelectField 
                name='investmentGoals'
                label='Investment Goals'
                options={INVESTMENT_GOALS}
                control={control}
                error={errors.investmentGoals}
                placeholder='Select your investment goal'
                required
            />

            <SelectField 
                name='riskTolerance'
                label='Risk Tolerance'
                options={RISK_TOLERANCE_OPTIONS}
                control={control}
                error={errors.riskTolerance}
                placeholder='Select your risk level'
                required
            />

            <SelectField 
                name='preferredIndustry'
                label='Preferred Industry'
                options={PREFERRED_INDUSTRIES}
                control={control}
                error={errors.preferredIndustry}
                placeholder='Select your preferred industry'
                required
            />

            <Button type="submit" disabled={isSubmitting} className="yellow-btn w-full mt-5">
                { isSubmitting ? 'Create Account' : 'Start Your Investing Journey'}
            </Button>

            <FooterLink text="Have an account.?" linkText="Sign in" href="/sign-in  " />
        </form>
    </> 
  )
}

export default SignUp