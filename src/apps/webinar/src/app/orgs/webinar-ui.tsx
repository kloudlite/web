"use client";
//@ts-ignore
import { Button } from 'kl-design-system/atoms/button';
//@ts-ignore
import { TextArea, TextInput } from 'kl-design-system/atoms/input';
//@ts-ignore
import Popup from 'kl-design-system/molecule/popup';
//@ts-ignore
import { cn } from 'kl-design-system/utils';
//@ts-ignore
import axios from 'axios';
//@ts-ignore
import { toast } from 'kl-design-system/molecule/toast';
import { useState } from 'react';
import Container from '../components/container';
import { JoinWebinar } from '../components/join-webinar';

type WebinarUIProps = {
    userDetails: any;
    meetingStatus: string;
    envVars: {
        dyteOrgId: string,
        dyteApiKey: string,
        dyteMeetingId: string,
        marketApiUrl: string,
    };
};

export const WebinarUI = ({ userDetails, meetingStatus, envVars }: WebinarUIProps) => {

    const { dyteOrgId, dyteApiKey, dyteMeetingId, marketApiUrl } = envVars;
    const [visible, setVisible] = useState(false);

    return (
        <Container
            headerExtra={
                <Button
                    variant="outline"
                    content="Register"
                    onClick={() => {
                        setVisible(true);
                    }}
                />
            }
        >
            <div className='flex flex-1 flex-col md:items-center self-stretch justify-center px-3xl py-5xl md:py-9xl'>
                <div className='flex flex-col gap-3xl md:w-[500px] px-3xl py-5xl md:px-9xl'>
                    <div className="flex flex-col items-stretch gap-lg">
                        <div className="flex flex-col gap-lg items-center pb-6xl text-center">
                            <div className={cn('text-text-strong headingXl text-center')}>
                                Join Kloudlite webinar
                            </div>
                            <div className="bodyMd-medium text-text-soft">
                                Join webinar and experience the power of Kloudlite
                            </div>
                        </div>
                        <JoinWebinar userData={userDetails} meetingStatus={meetingStatus} meetingId={dyteMeetingId} />
                        {visible && <HandleRegisterForm visible={visible} setVisible={setVisible} marketApiUrl={marketApiUrl} />}
                    </div>
                </div>
            </div>
        </Container>
    )
}

const HandleRegisterForm = ({ visible, setVisible, marketApiUrl }: { visible: boolean, setVisible: (v: boolean) => void, marketApiUrl: string }) => {
    const [formData, setFormData] = useState<any>({ name: '', companyName: '', email: '', country: '', mobileNo: '', message: '' });

    const handleInputChange = (e: any) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        try {
            console.log("environment===", marketApiUrl);
            const response = await axios.post(`${marketApiUrl}/events/register-user`, formData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (response.status === 200) {
                setVisible(false);
                toast.success('Thank you for registering to kloudlite events');
            }
        } catch (error) {
            toast.error("Error while registering to kloudlite events");
        }
    }


    return (
        <Popup.Root show={!!visible} className="!w-[600px]">
            <Popup.Form>
                <Popup.Content>
                    <div className="flex flex-col gap-2xl">
                        <TextInput
                            label="Full name"
                            size="lg"
                            placeholder="name"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                        />

                        <div className="flex flex-row justify-between gap-2xl">
                            <div className='flex-grow'>
                                <TextInput
                                    label="Company name"
                                    size="lg"
                                    placeholder="company name"
                                    name="companyName"
                                    value={formData.companyName}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className='flex-grow'>
                                <TextInput
                                    label="Email"
                                    size="lg"
                                    placeholder="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>

                        <div className="flex flex-row justify-between gap-2xl">
                            <div className='flex-grow'>
                                <TextInput
                                    label="Country"
                                    size="lg"
                                    placeholder="country"
                                    name="country"
                                    value={formData.country}
                                    onChange={handleInputChange}
                                // placeholder="company name"
                                />
                            </div>
                            <div className='flex-grow'>
                                <TextInput
                                    label="Mobile"
                                    size="lg"
                                    placeholder="mobile"
                                    name="mobileNo"
                                    value={formData.mobileNo}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>

                        <TextArea
                            placeholder="Write your messages..."
                            label="Message"
                            resize={false}
                            rows="4"
                            name="message"
                            value={formData.message}
                            onChange={handleInputChange}
                        />


                    </div>
                </Popup.Content>
                <Popup.Footer>
                    <Popup.Button
                        closable
                        content="Cancel"
                        variant="basic"
                        onClick={() => setVisible(false)}
                    />
                    <Popup.Button
                        type="submit"
                        variant="primary"
                        content="Register"
                        onClick={handleSubmit}
                    />
                </Popup.Footer>
            </Popup.Form>
        </Popup.Root>
    )

}