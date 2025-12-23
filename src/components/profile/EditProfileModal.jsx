import React, { useState, useEffect } from 'react';
import Modal from '../ui/Modal';
import { Button } from '../ui/Button';

const EditProfileModal = ({ isOpen, onClose, user, onSave }) => {
    const [formData, setFormData] = useState(user);

    useEffect(() => {
        if (user) {
            setFormData(user);
        }
    }, [user]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = () => {
        onSave(formData);
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Edit Profile">
            <div className="space-y-4">
                <div>
                    <label className="text-xs font-bold text-gray-700 mb-1 block">FULL NAME</label>
                    <input
                        type="text"
                        name="name"
                        value={formData?.name || ''}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none"
                    />
                </div>

                <div>
                    <label className="text-xs font-bold text-gray-700 mb-1 block">EMAIL</label>
                    <input
                        type="email"
                        name="email"
                        value={formData?.email || ''}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none"
                    />
                </div>

                <div>
                    <label className="text-xs font-bold text-gray-700 mb-1 block">PHONE</label>
                    <input
                        type="text"
                        name="phone"
                        value={formData?.phone || ''}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none"
                    />
                </div>

                <div>
                    <label className="text-xs font-bold text-gray-700 mb-1 block">ADDRESS</label>
                    <textarea
                        name="address"
                        value={formData?.address || ''}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none h-24 resize-none"
                    />
                </div>

                <div className="pt-2">
                    <Button fullWidth onClick={handleSubmit}>Save Changes</Button>
                </div>
            </div>
        </Modal>
    );
};

export default EditProfileModal;
